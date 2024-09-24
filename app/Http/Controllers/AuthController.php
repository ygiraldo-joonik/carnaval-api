<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Traits\ApiTrait;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use ApiTrait;

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|min:8'
        ]);

        if ($validator->fails())
            return  $this->onError(400, 'Validation Error', null, $validator->errors());

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;

        return $this->onSuccess(201, 'User Created', [
            'access_token' => $token,
        ]);
    }

    public function login(Request $request)
    {
        $loginUserData = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|min:8'
        ]);
        $user = User::where('email', $loginUserData['email'])->first();
        if (!$user || !Hash::check($loginUserData['password'], $user->password)) {
            return $this->onError(401, 'Invalid Credentials');
        }

        $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;

        return $this->onSuccess(200, 'User Logged In', [
            'access_token' => $token,
        ]);
    }

    public function info()
    {

        $user = auth()->user();
        $user->loadCount('travels');

        return $this->onSuccess(200, 'User Info', auth()->user());
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return $this->onSuccess(200, 'User Logged Out');
    }
}
