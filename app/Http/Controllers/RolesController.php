<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\Role;

class RolesController extends BaseController
{

    public function fetchRoles()
    {
        $users = Role::Select(
            'roles.id', 
            'roles.name', 
        )
        ->get();
        return response()->json(['data' => $users->toArray()], 200);
    }
}

