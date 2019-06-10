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

use Illuminate\Http\Request;
use function Zhiyi\Plus\setting;
use Illuminate\Http\JsonResponse;
use Zhiyi\Plus\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class CurrencyAppleController extends Controller
{
    /**
     * 获取苹果IAP设置.
     *
     * @return mixed
     * @author BS <414606094@qq.com>
     */
    public function getConfig()
    {
        $config = setting('pay', 'iapConfig') ?? [];

        return response()->json([
            'IAP_only' => $config['IAP_only'] ?? false,
            'rule'     => $config['rule'] ?? '',
        ], 200);
    }

    /**
     * 保存IAP配置.
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     * @throws \Throwable
     * @author BS <414606094@qq.com>
     */
    public function setConfig(Request $request)
    {
        $IAP_config = (bool) $request->input('IAP_only');
        $config = setting('pay');
        $config->set('iapConfig',
            ['IAP_only' => $IAP_config, 'rule' => $request->input('rule', '')]);

        return response()->json(['message' => '保存成功'], 201);
    }

    /**
     * 获取苹果商品列表.
     *
     * @return mixed
     * @author BS <414606094@qq.com>
     */
    public function getProducts()
    {
        $products = collect(setting('pay', 'appleIap') ?? []);

        return response()->json($products->toArray());
    }

    /**
     * 添加商品.
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     * @throws ValidationException
     * @author BS <414606094@qq.com>
     */
    public function addProduct(Request $request)
    {
        $this->validate($request, $this->getProductRule(),
            $this->getProductMessage());

        $config = setting('pay');
        $oldProducts = collect($config->get('appleIap') ?? []);

        $addProductInfo = $request->only('product_id', 'name', 'apple_id',
            'amount');
        $exists = $oldProducts->where('product_id',
            $addProductInfo['product_id'])
            ->count();
        if ($exists) {
            return response()->json(['message' => '产品id已存在'], 422);
        }

        $oldProducts->push($addProductInfo);
        $config->set('appleIap', array_values($oldProducts->all()));

        return response()->json(['message' => '添加成功'], 201);
    }

    /**
     * 删除商品.
     *
     * @param  Request  $request
     *
     * @return mixed
     * @author BS <414606094@qq.com>
     */
    public function delProduct(Request $request)
    {
        $config = setting('pay');
        $products = collect($config->get('appleIap'));
        $product_id = $request->query('product_id');
        $new = $products->reject(function ($product) use ($product_id) {
            return $product['product_id'] === $product_id;
        });

        $config->set('appleIap', array_values($new->all()));

        return response()->json(['message' => '删除成功'], 204);
    }

    protected function getProductRule()
    {
        return [
            'product_id' => 'required',
            'name'       => 'required',
            'apple_id'   => 'required',
            'amount'     => 'required',
        ];
    }

    protected function getProductMessage()
    {
        return [
            'product_id.required' => '请输入产品id',
            'name.required'       => '请输入产品名',
            'apple_id.required'   => '请输入apple_id',
            'amount.required'     => '请输入产品定价',
        ];
    }
}
