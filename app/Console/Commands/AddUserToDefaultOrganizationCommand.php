<?php

namespace App\Console\Commands;

use App\Models\Organization;
use App\Models\User;
use App\Models\UserOrganization;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

use Illuminate\Console\Command;

class AddUserToDefaultOrganizationCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'add:user {email} {name?} {password?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add a user to the default organization';


    protected $username;
    protected $email;
    protected $pasword;

    protected $defaultOrganization;

    protected $adminRole;

    public function __construct()
    {
        parent::__construct();

        $defaultOrganizationName = env('DEFAULT_ORGANIZATION_NAME', "Carnaval SA");

        $this->defaultOrganization = Organization::where('name', $defaultOrganizationName)->first();

        $this->adminRole = Role::where('name', 'admin')->first();
    }


    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->email = $this->argument('email');
        $this->username = $this->argument('name') ?? $this->argument('email');
        $this->pasword = $this->argument('password') ?? env('DEFAULT_SUPER_ADMIN_PASSWORD', "C4rn4v4l!");

        try {
            DB::beginTransaction();
            $user = User::create([
                'name' => $this->username,
                'email' => $this->email,
                'password' => Hash::make($this->pasword),
            ]);

            UserOrganization::create([
                'organization_id' => $this->defaultOrganization->id,
                'user_id' => $user->id,
                'role_id' => $this->adminRole->id,
                'model_type' => User::class,
                'accepted_at' => now(),
            ]);

            DB::commit();

            return Command::SUCCESS;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
