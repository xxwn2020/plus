<?php

declare(strict_types=1);

/*
 * +----------------------------------------------------------------------+
 * |                          ThinkSNS Plus                               |
 * +----------------------------------------------------------------------+
 * | Copyright (c) 2016-Present ZhiYiChuangXiang Technology Co., Ltd.     |
 * +----------------------------------------------------------------------+
 * | This source file is subject to enterprise private license, that is   |
 * | bundled with this package in the file LICENSE, and is available      |
 * | through the world-wide-web at the following url:                     |
 * | https://github.com/slimkit/plus/blob/master/LICENSE                  |
 * +----------------------------------------------------------------------+
 * | Author: Slim Kit Group <master@zhiyicx.com>                          |
 * | Homepage: www.thinksns.com                                           |
 * +----------------------------------------------------------------------+
 */

namespace Zhiyi\Plus\Http\Controllers\Admin;

use Artisan;
use Illuminate\Http\JsonResponse;
use Zhiyi\Plus\Http\Controllers\Controller;

class AuxiliaryController extends Controller
{
    /**
     * 清除缓存.
     *
     * @return mixed
     * @author BS <414606094@qq.com>
     */
    public function cleanCache()
    {
        Artisan::call('cache:clear');

        return response()->json([], 200);
    }

    /**
     * 重新缓存配置
     *
     * @return JsonResponse
     */
    public function cleanConfigCache()
    {
        Artisan::call('config:cache');

        return response()->json([], 200);
    }

    /**
     * 重新缓存路由列表
     *
     * @return JsonResponse
     */
    public function cleanRouteCache()
    {
        Artisan::call('route:cache');

        return response()->json([], 200);
    }
}
