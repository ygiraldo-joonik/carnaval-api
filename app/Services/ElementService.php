<?php

namespace App\Services;

use App\Models\Element;
use App\Models\ElementPassedUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;
use SplFileObject;

class ElementService
{
    const ELEMENT_ID_INDEX = 0;
    const USER_ID_INDEX = 1;
    const INFERRED_INDEX = 2;
    const DATE_INDEX = 3;

    protected CalculateParadeValuesService $calculateParadeValuesService;

    public function __construct(CalculateParadeValuesService $calculateParadeValuesService)
    {
        $this->calculateParadeValuesService = $calculateParadeValuesService;
    }

    public function getAll($blockId)
    {
        return Element::where('block_id', $blockId)->with('elementType', 'block')->get();
    }

    public function find($id)
    {
        return Element::with('elementType', 'block')->find($id);
    }

    public function validateData($data)
    {
        // make validator
        $validator = Validator::make($data, [
            'name' => 'required',
            'description' => 'required',
            'element_type_id' => 'required|exists:element_types,id',
            'block_id' => 'required|exists:blocks,id',
            'order' => 'integer',
            'people_count' => 'required|integer',
            'length' => 'required|numeric',
        ]);

        return $validator->validate();
    }

    public function store($data): Element
    {
        $blockElementsCount = Element::where("block_id", $data['block_id'])->count();

        $data['order'] = $blockElementsCount + 1;

        $element = Element::create($data);

        $this->calculateParadeValuesService->updateParadeComputedValues($element->block->parade_id);

        return $element;
    }

    public function update($data, $id): ?Element
    {
        $element = Element::find($id);

        if (!$element) {
            return null;
        }

        $element->update($data);

        $this->calculateParadeValuesService->updateParadeComputedValues($element->block->parade_id);

        return $element;
    }

    public function validateUpdateOrderData(array $data)
    {

        $validator = Validator::make($data, [
            'block_id' => 'required|exists:blocks,id',
            'elements' => 'required|array|min:2',
            'elements.*.id' => 'required|exists:elements,id',
            'elements.*.order' => 'required|numeric',
        ]);

        return $validator->validate();
    }

    public function updateOrder($data)
    {
        $elements = $data['elements'];
        $updateElements = [];
        foreach ($elements as $element) {
            $updated =  Element::where([
                'id' => $element['id'],
                'block_id' => $data['block_id']
            ])->update(['order' => $element['order']]);

            if ($updated)
                $updateElements[] = $element;
        }

        return $updateElements;
    }

    public function validateUpdateElementPosition(array $data)
    {
        $validator = Validator::make($data, [
            'element_id' => 'required|exists:elements,id',
            'block_id' => 'required|exists:blocks,id',
            'order' => 'required|numeric',
        ]);

        return $validator->validate();
    }

    public function updateElementPosition($elementId, $blockId, $order)
    {

        $element = Element::find($elementId);

        if ($element->block_id == $blockId) {
            if ($order > $element->order) {
                // Update elements between the new and old position
                Element::where('block_id', $blockId)
                    ->where('order', '>', $element->order)
                    ->where('order', '<=', $order)
                    ->decrement('order');
            } else {
                // Update elements between the new and old position
                Element::where('block_id', $blockId)
                    ->where('order', '>=', $order)
                    ->where('order', '<', $element->order)
                    ->increment('order');
            }
        } else if ($element->block_id != $blockId) {
            // Update elements after the old position in the old block
            Element::where('block_id', $element->block_id)
                ->where('order', '>', $element->order)
                ->decrement('order');

            // Update elements after the new position in the new block
            Element::where('block_id', $blockId)
                ->where('order', '>=', $order)
                ->increment('order');
        }

        $element->update(['block_id' => $blockId, 'order' => $order]);

        $this->calculateParadeValuesService->updateParadeComputedValues($element->block->parade_id);

        return $element;
    }


    public function delete($id)
    {
        $element = Element::find($id);

        if (!$element) {
            return null;
        }

        $paradeId = $element->block->parade_id;

        $element->delete();

        $this->calculateParadeValuesService->updateParadeComputedValues($paradeId);

        return $element;
    }

    public function validateBulkRegisterElementsPassed(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:csv,txt',
        ]);

        return $validator->validate();
    }

    /**
     * @param string $csvFile Path to the CSV file
     * @return string Delimiter
     */
    public function detectDelimiter($csvFile)
    {
        $delimiters = [";" => 0, "," => 0, "\t" => 0, "|" => 0];

        $handle = fopen($csvFile, "r");
        $firstLine = fgets($handle);
        fclose($handle);
        foreach ($delimiters as $delimiter => &$count) {
            $count = count(str_getcsv($firstLine, $delimiter));
        }

        return array_search(max($delimiters), $delimiters);
    }

    public function bulkRegisterElementsPassed(int $paradeId, UploadedFile $file)
    {
        $delimiter = $this->detectDelimiter($file->getRealPath());
        $fileObject = new SplFileObject($file->getRealPath());
        $fileObject->setFlags(SplFileObject::READ_CSV);
        $fileObject->setCsvControl($delimiter);

        $elementsPassedData = [];
        $elementsId = [];
        $usersId = [];

        foreach ($fileObject as $index => $row) {
            if ($index == 0) {
                continue;
            }

            if (count($row) < 4) {
                continue;
            }

            $elementsPassedData[] = [
                'element_id' => $row[self::ELEMENT_ID_INDEX],
                'user_id' => $row[self::USER_ID_INDEX],
                'inferred' => $row[self::INFERRED_INDEX],
                'created_at' => $row[self::DATE_INDEX],
            ];

            $elementsId[] = $row[self::ELEMENT_ID_INDEX];
            $usersId[] = $row[self::USER_ID_INDEX];
        }

        // delete repeated from elements and users
        $elementsId = array_unique($elementsId);
        $usersId = array_unique($usersId);


        // elements validating parade id
        $elements = Element::whereIn('id', $elementsId)
            ->whereHas('block', function ($query) use ($paradeId) {
                $query->where('parade_id', $paradeId);
            })->get();

        $users = User::whereIn('id', $usersId)->get();

        if (count($elementsId) != count($elements)) {
            throw new \Exception('Invalid elements');
        }

        if (count($usersId) != count($users)) {
            throw new \Exception('Invalid users');
        }

        $registeredElemetsPassed = [];

        // create or update elements passed
        foreach ($elementsPassedData as $elementPassedData) {
            $elementPassed = ElementPassedUser::where('element_id', $elementPassedData['element_id'])
                ->where('user_id', $elementPassedData['user_id'])
                ->first();

            if ($elementPassed) {
                $elementPassed->update($elementPassedData);
            } else {
                $elementPassed = ElementPassedUser::create($elementPassedData);
            }

            $registeredElemetsPassed[] = $elementPassed;
        }

        return $registeredElemetsPassed;
    }
}
