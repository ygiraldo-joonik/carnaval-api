<?php

namespace App\Traits;

use \Illuminate\Http\JsonResponse;

trait ApiTrait
{

    /**
     * @param $data
     * @param string $message
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    protected function onSuccess(int $code = 200, string $message = '', $data = ''): JsonResponse
    {
        return response()->json([
            'success' => true,
            'status' => $code,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    /**
     * @param int $code
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    protected function onError(int $code = 500, string $message = '', \Exception $exception = null, $data = null): JsonResponse
    {
        return response()->json([
            'success' => false,
            'status' => $code,
            'message' => $message,
            'data' => !is_null($exception)
                ? $exception
                : (!is_null($data) ? $data : null)
        ], $code);
    }
}
