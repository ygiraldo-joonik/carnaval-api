<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{


    protected $permissions = [
        // all orgs
        'all-organizations.read', // view all orgs
        'all-organizations.manage', // manage all orgs
        'all-organizations.create', // create org
        'all-organizations.delete', // delete org

        'all-users.read', // view all users

        'all-events.read', // view all events

        // org
        'organization.update', // update org
        'users.read', // view users in org
        'users.invite', // invite users to org
        'users.manage', // revoke, assign roles


        'element-types.read', // view element types
        'element-types.create', // create element types
        'element-types.update', // update element types
        'element-types.delete', // delete element types

        'events.read', // view events
        'events.create', // create events
        'events.update', // update events
        'events.delete', // delete events

        'parades.read', // view parades
        'parades.create', // create parades
        'parades.update', // update parades
        'parades.delete', // delete parades

        'elements.read', // view elements
        'elements.create', // create elements
        'elements.update', // update elements
        'elements.delete', // delete elements
    ];

    protected $roles = [
        [
            'name' => 'super-admin',
            'permissions' => [
                'all-organizations.read',
                'all-organizations.manage',
                'all-organizations.create',
                'all-organizations.delete',
                'all-users.read',
                'all-events.read'
            ]
        ],
        [
            'name' => 'admin',
            'permissions' => [
                'organization.update',
                'users.read',
                'users.invite',
                'users.manage',
                'element-types.read',
                'element-types.create',
                'element-types.update',
                'element-types.delete',
                'events.read',
                'events.create',
                'events.update',
                'events.delete',
                'parades.read',
                'parades.create',
                'parades.update',
                'parades.delete',
                'elements.read',
                'elements.create',
                'elements.update',
                'elements.delete',
            ]
        ],
        [
            'name' => 'read-only',
            'permissions' => [
                'users.read',
                'element-types.read',
                'events.read',
                'parades.read',
                'elements.read',
            ]
        ]
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        // app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();


        $rolesNames = array_map(fn($role) => $role["name"], $this->roles);

        // Roles names included in the array
        $existingRoles = Role::whereIn("name", $rolesNames)->get();

        // Roles names not included in the array that will be removed
        $removableRoles = Role::whereNotIn("name", $rolesNames)->get();
        $removableRolesNames = $removableRoles->pluck("name")->toArray();

        // remove all removable roles permissions and relations with users
        foreach ($removableRoles as $role) {
            $role->syncPermissions([]);

            $this->removeAllRolesRelations($role->name);
        }

        // remove all removable roles 
        Role::whereIn("name", $removableRolesNames)->delete();

        foreach ($existingRoles as $role) {
            $role->syncPermissions([]);
        }

        Permission::whereNotIn("name", $this->permissions)->delete();

        foreach ($this->permissions as $permission) {
            $existingPermission = Permission::where(
                "name",
                $permission
            )->first();

            if (!$existingPermission) {
                Permission::create([
                    "guard_name" => "web",
                    "name" => $permission,
                ]);
            }
        }

        foreach ($this->roles as $role) {
            $existingRole = Role::where("name", $role["name"])->first();

            if (!$existingRole) {
                $existingRole = Role::create([
                    "guard_name" => "web",
                    "name" => $role["name"],
                ]);
            }

            $existingRole->syncPermissions($role["permissions"]);
        }
    }

    public function removeAllRolesRelations(string $roleName)
    {
        $tableNames = config('permission.table_names');

        // Use raw SQL to delete model_has_roles records related to this role
        DB::statement(
            "
                DELETE FROM " .  $tableNames['model_has_roles'] . "
                WHERE role_id IN (
                    SELECT id FROM roles WHERE name = :roleName
                )
            ",
            ['roleName' => $roleName]
        );

        echo "All model_has_roles records related to role '{$roleName}' have been deleted.";
    }
}
