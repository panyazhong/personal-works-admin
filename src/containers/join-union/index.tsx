import { Button, message, Modal, Table, TableColumnType, Tabs } from 'antd';
import { tw } from 'twind';
import { atom, useAtom } from 'jotai';
import {
  deleteExhibition,
  publishExhibition,
  queryExhibitionList,
  unPublishExhibition,
} from '../../api';
import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'ahooks';

export const thoughtOpenAtom = atom(false);
export const thoughtDetailIdAtom = atom('');

const Options = [
  {
    label: '未删除',
    value: 'all',
  },
  {
    label: '已删除',
    value: 'isDelete',
  },
];

const NewsList = () => {
  const [open, setOpen] = useAtom(thoughtOpenAtom);
  const [, setId] = useAtom(thoughtDetailIdAtom);
  const [filters, setFilters] = useState<any>('all');

  const columns: TableColumnType<any>[] = [
    {
      dataIndex: 'name',
      title: '名称',
      render: (_, record) => {
        return (
          <div className={tw`flex gap-2`}>
            {(record.zh || record.en || record.fr).title}
          </div>
        );
      },
    },
    // {
    //   dataIndex: "desc",
    //   title: "文章简介",
    // },
    {
      dataIndex: 'opearate',
      title: '操作',
      render: (_, record) => {
        const recordItem = record.zh || record.en || record.fr;
        if (recordItem?.isDeleted) return '已删除';
        return (
          <div className={tw`flex gap-2`}>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setId(recordItem.groupId);
              }}
            >
              编辑
            </Button>
            <Button
              type="dashed"
              disabled={recordItem.isPublish}
              onClick={() => {
                Modal.confirm({
                  title: '发布',
                  content: '确定发布吗',
                  onOk: async () => {
                    await publishExhibition({ groupId: record.groupId });
                    message.success('发布成功');
                    query();
                  },
                });
              }}
            >
              发布
            </Button>
            <Button
              type="primary"
              danger
              disabled={!recordItem.isPublish}
              onClick={() => {
                Modal.confirm({
                  title: '取消发布',
                  content: '确定取消发布吗？',
                  onOk: async () => {
                    await unPublishExhibition({ groupId: record.groupId });
                    message.success('取消发布成功');
                    query();
                  },
                });
              }}
            >
              取消发布
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                Modal.confirm({
                  title: '删除',
                  content: '确定删除吗？',
                  onOk: async () => {
                    await deleteExhibition({ groupId: record.groupId });
                    message.success('删除成功');
                    query();
                  },
                });
              }}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  const [newsList, setNewsList] = useState([]);
  const [displayList, setDislayList] = useState([]);

  const handleAdd = () => {
    setId('');
    setOpen(true);
  };

  const query = async () => {
    const res = await queryExhibitionList();
    setNewsList(res);

    setDislayList(res);
  };

  useEffect(() => {
    query();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        pagination={false}
        dataSource={displayList}
        rowKey="groupId"
      />
    </div>
  );
};

export default NewsList;
