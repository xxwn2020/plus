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

namespace Zhiyi\Component\ZhiyiPlus\PlusComponentFeed\AdminControllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Zhiyi\Plus\Models\Comment;
use Illuminate\Support\Facades\Cache;
use Zhiyi\Plus\Http\Controllers\Controller;
use Zhiyi\Component\ZhiyiPlus\PlusComponentFeed\Models\Feed;
use Zhiyi\Component\ZhiyiPlus\PlusComponentFeed\Models\FeedPinned;
use function Zhiyi\Plus\setting;

class HomeController extends Controller
{
    /**
     * feed management background entry.
     *
     * @return mixed
     * @author Seven Du <shiweidu@outlook.com>
     */
    public function show()
    {
        return view('feed:view::admin', [
            'base_url'     => route('feed:admin'),
            'csrf_token'   => csrf_token(),
            'wallet_ratio' => setting('wallet', 'ratio', 100)
        ]);
    }

    /**
     * 获取分享统计信息.
     *
     * @param  Request  $request
     * @param  Feed  $feedModel
     * @param  Comment  $commentModel
     * @param  Carbon  $datetime
     *
     * @return mixed
     * @throws \Throwable
     * @author Seven Du <shiweidu@outlook.com>
     */
    public function statistics(
        Request $request,
        Feed $feedModel,
        Comment $commentModel,
        Carbon $datetime
    ) {
        $type = $request->query('type', 'all');
        // $now = $datetime->now();
        $feedPinned = $commentPinned = FeedPinned::query();
        $feedModel = $feedModel->newQuery();
        switch ($type) {
            // 查询总统计信息
            case 'all':

                break;
            // 查询今日统计
            case 'today':
                $datetime = $datetime->now();
                $feedModel = $feedModel
                    ->where('created_at', '>', $datetime);
                $commentModel = $commentModel->newQuery()
                    ->where('created_at', '>',
                        $datetime);
                $feedPinned
                    ->where('created_at', '>', $datetime);
                $commentPinned
                    ->where('created_at', '>',
                        $datetime);
                break;
            // 查询昨日统计
            case 'yesterday':
                $stime = $datetime->yesterday();
                $etime = $datetime->today();
                $feedModel = $feedModel->whereBetween('created_at',
                    [$stime, $etime]);
                $commentModel = $commentModel->newQuery()
                    ->whereBetween('created_at',
                        [$stime, $etime]);
                $feedPinned
                    ->whereBetween('created_at',
                        [$stime, $etime]);
                $commentPinned
                    ->whereBetween('created_at',
                        [$stime, $etime]);
                break;
            // 查询一周统计
            case 'week':
                $datetime = $datetime->subDays(7);
                $feedModel = $feedModel
                    ->where('created_at', '>', $datetime);
                $commentModel = $commentModel->newQuery()
                    ->where('created_at', '>',
                        $datetime);
                $feedPinned
                    ->where('created_at', '>', $datetime);
                $commentPinned
                    ->where('created_at', '>',
                        $datetime);
                break;
        }

        $statistics = Cache::remember(sprintf('feed_statistics_%s', $type), 600,
            function () use (
                $feedModel,
                $commentModel,
                $feedPinned,
                $commentPinned,
                $type
            ) {
                return $feedModel->getConnection()
                    ->transaction(function () use (
                        $feedModel,
                        $commentModel,
                        $feedPinned,
                        $commentPinned,
                        $type
                    ) {
                        // 动态总数
                        $feedsCount = $feedModel->count();

                        // 动态评论总数
                        $commentsCount
                            = $commentModel->where('commentable_type',
                            'feeds')
                            ->count();

                        // $feedPinned = $feedPinned->whereDate('expires_at', '>=', $now)->count();

                        // 置顶动态
                        $feedPinnedCount = $feedPinned
                            ->where('channel', 'feed')
                            ->count();

                        $commentPinnedCount = $commentPinned->where('channel',
                            'comment')
                            ->count();

                        // 付费动态总数
                        $payFeedsCount = $feedModel->whereExists(function (
                            $query
                        ) {
                            return $query->from('paid_nodes')
                                ->where('channel', 'feed')
                                ->whereRaw('paid_nodes.raw = feeds.id');
                        })
                            // ->orWhere(function ($query) {
                            //     return $query->whereHas('images', function ($query) {
                            //         return $query->whereExists(function ($query) {
                            //             return $query->from('paid_nodes')->where('channel', 'file')->whereRaw('paid_nodes.raw = file_withs.id');
                            //         });
                            //     });
                            // })
                            ->count();

                        // 付费总金额
                        // TODO 目前只统计文字付费动态金额
                        $payCount = $feedModel->whereExists(function ($query) {
                            return $query->from('paid_nodes')
                                ->where('channel', 'feed')
                                ->whereRaw('paid_nodes.raw = feeds.id');
                        })->get()->map(function ($feed) {
                            return $feed->paidNode->amount;
                        })->sum();

                        return $type !== 'all' ? [
                            'feedsCount'    => $feedsCount,
                            'commentsCount' => $commentsCount,
                            'payFeedsCount' => $payFeedsCount,
                            'payCount'      => $payCount,
                            'topFeed'       => $feedPinnedCount,
                            'topComment'    => $commentPinnedCount
                        ] : [
                            'feedsCount'    => 10000,
                            'commentsCount' => 3000,
                            'payFeedsCount' => 200,
                            'payCount'      => 600,
                            'topFeed'       => 100,
                            'topComment'    => 2000,
                        ];
                    });
            });


        return response()->json($statistics, 200);
    }
}
