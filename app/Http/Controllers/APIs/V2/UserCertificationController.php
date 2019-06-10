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

namespace Zhiyi\Plus\Http\Controllers\APIs\V2;

use stdClass;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Zhiyi\Plus\Models\FileWith as FileWithModel;
use Zhiyi\Plus\Models\Certification as CertificationModel;
use Illuminate\Contracts\Routing\ResponseFactory as ResponseFactoryContract;
use Zhiyi\Plus\Http\Requests\API2\UserCertification as UserCertificationRequest;

class UserCertificationController extends Controller
{
    /**
     * Get a user certification.
     *
     * @param  Request  $request  [description]
     * @param  ResponseFactoryContract  $response  [description]
     *
     * @return mixed
     * @author Seven Du <shiweidu@outlook.com>
     */
    public function show(Request $request, ResponseFactoryContract $response)
    {
        $user = $request->user();
        $certification = $user->certification;
        if (! $certification) {
            return $response->json($certification, 200);
        }

        $fileInfo = [];
        if ($certification->front && $certification->back) {
            $certification->data['files'] = [
                $certification->front,
                $certification->back,
            ];
        }

        return response()->json($certification);

        foreach (
            $certification->data->files as
            $key => $file
        ) {
            $file = FileWithModel::query()->where('id', $file)->with('file')
                ->first();
            $fileInfo[$key] = new stdClass();
            $fileInfo[$key]->file = $file->id;
            $fileInfo[$key]->size = $file->size;
            $fileInfo[$key]->mime = $file->file->mime;
        }
        $fileInfo = collect(array_values($fileInfo));
        $certification->files = $fileInfo;

        return $response->json($certification, 200);
    }

    /**
     * Send certification.
     *
     * @param  UserCertificationRequest  $request
     * @param  ResponseFactoryContract  $response
     * @param  CertificationModel  $certification
     * @param  FileWithModel  $fileWithModel
     *
     * @return mixed
     * @throws \Throwable
     * @author Seven Du <shiweidu@outlook.com>
     */
    public function store(
        UserCertificationRequest $request,
        ResponseFactoryContract $response,
        CertificationModel $certification,
        FileWithModel $fileWithModel
    ) {
        $user = $request->user();
        $type = $request->input('type');
        $data = $request->only(['name', 'phone', 'number', 'desc']);
        $files = $this->findNotWithFileModels($request, $fileWithModel);

        $fileWithes = $files->pluck('id');
        if ($type === 'org') {
            $data = array_merge($data,
                $request->only(['org_name', 'org_address']));
        }
        $certification->front = $fileWithes[0];
        $certification->back = $fileWithes[1];
        $certification->certification_name = $type;
        $certification->data = $data;
        $certification->status = 0;

        return $certification->getConnection()->transaction(function () use (
            $user,
            $files,
            $certification,
            $response
        ) {
            $files->each(function ($file) use ($user) {
                $file->channel = 'certification:file';
                $file->raw = $user->id;
                $file->save();
            });
            $user->certification()->save($certification);

            return $response->json(['message' => '提交成功，等待审核'])
                ->setStatusCode(201);
        });
    }

    /**
     * Update certification.
     *
     * @param  UserCertificationRequest  $request
     * @param  ResponseFactoryContract  $response
     * @param  FileWithModel  $fileWithModel
     *
     * @return mixed
     * @author Seven Du <shiweidu@outlook.com>
     */
    public function update(
        UserCertificationRequest $request,
        ResponseFactoryContract $response,
        FileWithModel $fileWithModel
    ) {
        $user = $request->user();
        $type = $request->input('type');
        $certification = $user->certification;

        if ($certification->status === 1) {
            return $response->json(['message' => '已审核通过，无法修改'], 422);
        }

        $updateData = $request->only(['name', 'phone', 'number', 'desc']);
        if ($type === 'org') {
            $updateData = array_merge($updateData,
                $request->only(['org_name', 'org_address']));
        }

        $files = $this->findNotWithFileModels($request, $fileWithModel);
        $fileIds = array_values(
            array_filter((array) $request->input('files', []))
        );

        if (! empty($fileIds)) {
            $updateData['files'] = $fileIds;
        }

        $certification->certification_name = $type
            ?: $certification->certification_name;
        $certification->data = array_merge($certification->data,
            array_filter($updateData));
        $certification->status = 0;

        return $user->getConnection()->transaction(function () use (
            $user,
            $files,
            $certification,
            $response
        ) {
            $files->each(function ($file) use ($user) {
                $file->channel = 'certification:file';
                $file->raw = $user->id;
                $file->save();
            });
            $certification->save();

            return $response->json(['message' => '提交成功，等待审核'], 201);
        });
    }

    /**
     * File not with file models.
     *
     * @param  Request  $request
     * @param  FileWithModel  $fileWithModel
     *
     * @return Collection
     * @author Seven Du <shiweidu@outlook.com>
     */
    protected function findNotWithFileModels(
        Request $request,
        FileWithModel $fileWithModel
    )
    : Collection {
        $files = new Collection(
            array_filter((array) $request->input('files', []))
        );

        if ($files->isEmpty()) {
            return $files;
        }

        return $fileWithModel->where('channel', null)
            ->where('raw', null)
            ->whereIn('id', $files)
            ->get();
    }
}
