<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Userrole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends BaseController
{

    public function addUser(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|unique:users',
            'firstName' => 'required',
            'middleName' => 'required',
            'lastName' => 'required',
        ]);

        if($validated) {
            $user = new User;
            $user->first_name = $request->firstName;
            $user->middle_name = $request->middleName;
            $user->last_name = $request->lastName;
            $user->email = $request->email;
            $user->save();

            foreach ($request->roleIds as $roleId) {
                $userRole = new Userrole;
                $userRole->user_id = $user->id;
                $userRole->role_id = $roleId;
                $userRole->save();
            }
            return response()->json(['message' => 'User added successfully', 'data' => $user], 200);
        }
    }

    public function fetchUserData(Request $request)
    {
        $roleId = $request->id ? $request->id : 1;
        $users = User::Select(
            'users.first_name', 
            'users.middle_name', 
            'users.last_name', 
            'users.email', 
            'roles.name as role'
        )
        ->leftJoin('userroles', 'userroles.user_id', 'users.id')
        ->join('roles', 'roles.id', 'userroles.role_id')
        ->where('roles.id', $roleId)
        ->get();
        return response()->json(['data' => $users->toArray()], 200);
    }







    ///////////////////
    
    public function register(Request $request)
    {
        $user = new User;

        $validated = $request->validate([
            'email' => 'required|unique:users',
            'fullName' => 'required',
            'password' => 'required',
        ]);

        if($validated) {
            $user->full_name = $request->fullName;
            $user->email = $request->email;
            $user->password = $request->password;
            $user->save();
            
            if (Auth::attempt(array_merge($user->toArray(), ['password' => $request->password]))) {
                $request->session()->regenerate();
            }
        }
        if(Auth::check()) {
            return response([
                "fullName" => $request->fullName,
                "email" => $request->email,
                "isLogin" => true
            ]);
        }
    }
    
    public function logout(Request $request)
    {
        auth()->logout();
        $request->session()->invalidate();
        return response(Auth::user());
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
        }
        if(Auth::check()) {
            return response([
                "isLogin" => true
            ]);
        }
        return [];
    }

    public function getchUserData()
    {
        if(Auth::check()) {
            $user = Auth::user();
            return response([
                "fullName" => $user->full_name,
                "email" => $user->email,
                "isLogin" => true
            ]);
        }
        return response([]);
    }
}

