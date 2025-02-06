<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DefaultOrganizationAndEventSeeder extends Seeder
{


    protected $defaultSuperAdminEmail;
    protected $defaultSuperAdminPassword;
    protected $defaultSuperAdminName;


    protected $defaultOrganizationName;
    protected $defaultEventName;
    protected $defaultEventDescription;
    protected $defaultEventStartDate;
    protected $defaultEventEndDate;

    public function __construct()
    {
        $this->defaultSuperAdminEmail = env('DEFAULT_SUPER_ADMIN_EMAIL', "super-admin@carnaval.com");
        $this->defaultSuperAdminPassword = env('DEFAULT_SUPER_ADMIN_PASSWORD', "C4rn4v4l!");
        $this->defaultSuperAdminName = env('DEFAULT_SUPER_ADMIN_NAME', "Super Admin");

        $this->defaultOrganizationName = env('DEFAULT_ORGANIZATION_NAME', "Carnaval SA");

        $this->defaultEventName = env('DEFAULT_EVENT_NAME', "Carnaval de Barranquilla 2025");
        $this->defaultEventDescription = env('DEFAULT_EVENT_DESCRIPTION', "Carnaval de Barranquilla 2025");
        $this->defaultEventStartDate = env('DEFAULT_EVENT_START_DATE', "2025-02-22");
        $this->defaultEventEndDate = env('DEFAULT_EVENT_END_DATE', "2025-02-25");
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::beginTransaction();

        try {

            $defaultUser = User::where(
                'email',
                $this->defaultSuperAdminEmail
            )->first();

            if (!$defaultUser) {
                $defaultUser = User::create([
                    'name' => 'Super Admin',
                    'email' => $this->defaultSuperAdminEmail,
                    'password' => Hash::make($this->defaultSuperAdminPassword),
                    'state' => 1,
                ]);

                setPermissionsTeamId(0);
                $defaultUser->assignRole('super-admin');
                $defaultUser->roles()->where('name', 'super-admin')->update(['accepted_at' => now()]);
            }

            $defaultOrganization = $defaultUser->organizations()->where('name', $this->defaultOrganizationName)->first();

            if (!$defaultOrganization) {

                $adminRole = Role::where('name', 'admin')->first();

                $defaultOrganization = $defaultUser->organizations()->create([
                    'name' => $this->defaultOrganizationName,
                    'state' => 1,
                    'owner_id' => $defaultUser->id,
                ], [
                    'role_id' => $adminRole->id,
                    'accepted_at' => now(),
                    'model_type' => User::class,
                ]);
            }

            $defaultEvent = $defaultOrganization->events()->where('name', $this->defaultEventName)->first();

            if (!$defaultEvent) {
                $defaultEvent = $defaultOrganization->events()->create([
                    'name' => $this->defaultEventName,
                    'description' => $this->defaultEventDescription,
                    'start_date' => $this->defaultEventStartDate,
                    'end_date' => $this->defaultEventEndDate,
                    'user_id' => $defaultUser->id,

                ]);
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
