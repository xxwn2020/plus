<?php

namespace Zhiyi\Plus\Observers;

use Zhiyi\Plus\Models\User;
use Zhiyi\Plus\Models\Famous;

class UserObserver
{
    /**
     * Handle the user "created" event.
     *
     * @param  User  $user
     *
     * @return void
     */
    public function created(User $user)
    {
        // 处理默认关注和默认相互关注
        Famous::query()->with('user')->get()->groupBy('type')
            ->map(function ($type, $key) use ($user) {
                $users = $type->pluck('user');
                $user->followings()->attach($users->pluck('id'));
                // 相互关注
                if ($key === 'each') {
                    $users->map(function ($source) use ($user) {
                        $source->followings()->attach($user);
                    });
                }
            });
    }
}
