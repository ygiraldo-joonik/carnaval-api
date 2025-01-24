<?php

namespace App\Services;

use App\Models\Element;
use App\Models\ElementPassedUser;
use App\Models\Parade;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class UserParadeService
{
    // get parades that belong to the events of current user organizations
    public function list(?int $userId = null, ?string $date = null)
    {
        return Parade::when(!is_null($userId), function ($query) use ($userId) {
            $query->whereHas('event', function ($query) use ($userId) {
                $query->whereHas('organization', function ($query) use ($userId) {
                    $query->whereHas('users', function ($query) use ($userId) {
                        $query->where('user_id', $userId);
                    });
                });
            });
        })
            ->when(!is_null($date), function ($query) use ($date) {
                $query->whereDate('date', $date);
            })
            ->get();
    }

    // get parade by id, with block and elements
    public function find($id, ?int $userId = null)
    {
        return Parade::when(!is_null($userId), function ($query) use ($userId) {
            $query->whereHas('event', function ($query) use ($userId) {
                $query->whereHas('organization', function ($query) use ($userId) {
                    $query->whereHas('users', function ($query) use ($userId) {
                        $query->where('user_id', $userId);
                    });
                });
            });
        })
            ->with([
                'blocks' => fn($q) => $q->orderBy('order'),
                'blocks.elements' => fn($q) => $q->orderBy('order'),
                'blocks.elements.type' =>  fn($q) => $q->withTrashed()
            ])
            ->find($id);
    }

    // get parade by id, with block and elements
    public function findAndMarkElementsPassed($id, ?int $userId = null)
    {
        $parade = $this->find($id, $userId);

        $elementsPassedUser = $this->getElementsPassedByParade($parade->id, $userId);

        return $this->markParadeElementsPassedUser($parade, $elementsPassedUser);
    }

    // get elements passed by user in parade
    public function getElementsPassedByParade($paradeId, $userId): Collection
    {
        $paradeElementsId = Parade::find($paradeId)->blocks->map(function ($block) {
            return $block->elements->map(function ($element) {
                return $element->id;
            });
        })->flatten();

        $passedElements = ElementPassedUser::where('user_id', $userId)
            ->whereIn('element_id', $paradeElementsId)
            ->get();

        return $passedElements;
    }

    // mark elements passed by user in parade
    public function markParadeElementsPassedUser(Parade &$parade, Collection $elementsPassedUser)
    {
        $parade->blocks->each(function ($block) use ($elementsPassedUser) {
            $block->elements->each(function ($element) use ($elementsPassedUser) {
                $elementPassedUser = $elementsPassedUser->firstWhere('element_id', $element->id);
                if ($elementPassedUser) {
                    $element->passed = true;
                    $element->inferred = boolval($elementPassedUser->inferred);
                } else {
                    $element->passed = false;
                    $element->inferred = false;
                }
            });
        });

        return $parade;
    }

    // validare register element passed user
    public function validateRegisterElementPassedUser(array $data)
    {
        return validator($data, [
            'element_id' => 'required|exists:elements,id',
            'date' => 'required|date_format:Y-m-d H:i:s',
        ])->validate();
    }

    public function registerElementPassedUser($userId, $elementId, $date = null)
    {

        if (is_null($date))
            $date = now();

        $element = Element::with('block.parade')->find($elementId);

        $elementOrder = $element->order;
        $blockOrder = $element->block->order;
        $paradeId = $element->block->parade_id;

        $elementsPassedUser = ElementPassedUser::where('user_id', $userId)
            ->where('element_id', $elementId)
            ->first();

        if ($elementsPassedUser)
            throw new Exception('Element already passed by user');

        //// search elements that are not mark as passed before the current element

        // search elements that are before the current block
        $elementsInDifferentBlocksBefore = Element::whereHas('block', function ($query) use ($blockOrder, $paradeId) {
            $query->where('order', '<', $blockOrder)
                ->where('parade_id', $paradeId);
        })->whereDoesntHave('usersPassed', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        // search elements that are in the current block but with order less than the current element
        $elementsInSameBlocksBefore = Element::whereHas('block', function ($query) use ($blockOrder, $paradeId) {
            $query->where('order', $blockOrder)
                ->where('parade_id', $paradeId);
        })->whereDoesntHave('usersPassed', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->where('order', '<', $elementOrder)
            ->where('id', '!=', $elementId)
            ->get();

        $elementsToMarkPassedAsInferred = $elementsInDifferentBlocksBefore->merge($elementsInSameBlocksBefore);

        $elementsPassedUser = [];

        // create elements passed as inferred
        $elementsToMarkPassedAsInferred->each(function ($element) use ($userId, $date) {
            $elementsPassedUser[] =   ElementPassedUser::create([
                'element_id' => $element->id,
                'user_id' => $userId,
                'inferred' => true,
                'created_at' => $date,
            ]);
        });

        // create current element passed by user
        array_push($elementsPassedUser, ElementPassedUser::create([
            'element_id' => $elementId,
            'user_id' => $userId,
            'inferred' => false,
            'created_at' => $date
        ]));

        return $elementsPassedUser;
    }
}
