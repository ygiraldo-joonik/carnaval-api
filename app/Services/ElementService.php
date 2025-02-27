<?php

namespace App\Services;

use App\Models\Block;
use App\Models\Element;
use App\Models\ElementPassedUser;
use App\Models\ElementType;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;
use SplFileObject;

class ElementService
{
    const BULK_ELEMENTS_PASSED_ELEMENT_ID_INDEX = 0;
    const BULK_ELEMENTS_PASSED_USER_ID_INDEX = 1;
    const BULK_ELEMENTS_PASSED_INFERRED_INDEX = 2;
    const BULK_ELEMENTS_PASSED_DATE_INDEX = 3;

    const BULK_ELEMENTS_NAME_INDEX = 0;
    const BULK_ELEMENTS_DESCRIPTION_INDEX = 1;
    const BULK_ELEMENTS_ELEMENT_TYPE_INDEX = 2;
    const BULK_ELEMENTS_LENGTH_INDEX = 3;
    const BULK_ELEMENTS_PEOPLE_COUNT_INDEX = 4;

    protected CalculateParadeValuesService $calculateParadeValuesService;
    protected string $defaultOrganizationName;

    public function __construct(CalculateParadeValuesService $calculateParadeValuesService)
    {
        $this->calculateParadeValuesService = $calculateParadeValuesService;
        $this->defaultOrganizationName = env('DEFAULT_ORGANIZATION_NAME');
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

        $element->block->elements()->where('order', '>', $element->order)->decrement('order');

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
                'element_id' => $row[self::BULK_ELEMENTS_PASSED_ELEMENT_ID_INDEX],
                'user_id' => $row[self::BULK_ELEMENTS_PASSED_USER_ID_INDEX],
                'inferred' => $row[self::BULK_ELEMENTS_PASSED_INFERRED_INDEX],
                'created_at' => $row[self::BULK_ELEMENTS_PASSED_DATE_INDEX],
            ];

            $elementsId[] = $row[self::BULK_ELEMENTS_PASSED_ELEMENT_ID_INDEX];
            $usersId[] = $row[self::BULK_ELEMENTS_PASSED_USER_ID_INDEX];
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

    public function bulkCreateElements(int $blockId, UploadedFile $file)
    {
        $delimiter = $this->detectDelimiter($file->getRealPath());
        $fileObject = new SplFileObject($file->getRealPath());
        $fileObject->setFlags(SplFileObject::READ_CSV);
        $fileObject->setCsvControl($delimiter);

        $elementTypesIds = $this->getElementTypesIds($fileObject);


        $block = Block::withCount('elements')->find($blockId);


        $elements = [];
        $createdElementsCount = 0;

        foreach ($fileObject as $index => $row) {
            if ($index == 0) {
                continue;
            }

            if (count($row) < 5) {
                continue;
            }
            $element = Element::where('name', $row[self::BULK_ELEMENTS_NAME_INDEX])
                ->where('block_id', $blockId)
                ->first();

            if ($element)
                $element->update([
                    'description' => $row[self::BULK_ELEMENTS_DESCRIPTION_INDEX],
                    'element_type_id' => $elementTypesIds[$row[self::BULK_ELEMENTS_ELEMENT_TYPE_INDEX]],
                    'people_count' => $row[self::BULK_ELEMENTS_PEOPLE_COUNT_INDEX],
                    'length' => $row[self::BULK_ELEMENTS_LENGTH_INDEX],
                ]);
            else {
                $createdElementsCount++;
                $element = Element::create([
                    'name' => $row[self::BULK_ELEMENTS_NAME_INDEX],
                    'description' => $row[self::BULK_ELEMENTS_DESCRIPTION_INDEX],
                    'element_type_id' => $elementTypesIds[$row[self::BULK_ELEMENTS_ELEMENT_TYPE_INDEX]],
                    'block_id' => $blockId,
                    'people_count' => $row[self::BULK_ELEMENTS_PEOPLE_COUNT_INDEX],
                    'length' => $row[self::BULK_ELEMENTS_LENGTH_INDEX],
                    'order' =>  $block->elements_count + $createdElementsCount
                ]);
            }


            $elements[] = $element;
        }


        $this->calculateParadeValuesService->updateParadeComputedValues($block->parade_id);

        return $elements;
    }

    public function getElementTypesIds($rows)
    {

        $defaultOrganization = Organization::where('name', $this->defaultOrganizationName)->first();

        $elementTypesMap = [];

        foreach ($rows as $index => $row) {
            if ($index == 0) {
                continue;
            }
            if (!isset($elementTypesMap[$row[self::BULK_ELEMENTS_ELEMENT_TYPE_INDEX]])) {
                $elementType = ElementType::where('name', $row[self::BULK_ELEMENTS_ELEMENT_TYPE_INDEX])->first();

                if (!$elementType) {
                    $elementType = ElementType::create([
                        'name' => $row[self::BULK_ELEMENTS_ELEMENT_TYPE_INDEX],
                        'description' => '-',
                        'color' => '#ABB8C3',
                        'organization_id' => $defaultOrganization->id,
                        'people_count' => $row[self::BULK_ELEMENTS_PEOPLE_COUNT_INDEX],
                        'length' => $row[self::BULK_ELEMENTS_LENGTH_INDEX],
                    ]);
                }

                $elementTypesMap[$row[self::BULK_ELEMENTS_ELEMENT_TYPE_INDEX]] = $elementType->id;
            }
        }


        return $elementTypesMap;
    }
}
