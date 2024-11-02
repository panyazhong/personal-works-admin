import { Button, message, Modal, Table, TableColumnType, Tabs } from 'antd';
import { tw } from 'twind';
import EditThought from './edit-thought';
import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import {
  deleteArticle,
  publishArticle,
  queryArticleList,
  unPublishArticle,
} from '../../api';
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

const ThoughtList = () => {
  const [open, setOpen] = useAtom(thoughtOpenAtom);
  const [, setId] = useAtom(thoughtDetailIdAtom);
  const [filters, setFilters] = useState<any>('all');

  const [tableData, setTableData] = useState<any[]>([]);
  const [displayList, setDislayList] = useState<any[]>([]);

  const columns: TableColumnType<any>[] = [
    {
      dataIndex: 'name',
      title: '名称',
      width: '300px',
      render: (_, record) => {
        return (
          <div className={tw(`truncate max-w-[300px]`)}>
            {(record.zh || record.en || record.fr).title || '--'}
          </div>
        );
      },
    },
    {
      dataIndex: 'desc',
      title: '文章简介',
      width: 400,
      render: (_, record) => {
        return (
          <div
            className={tw``}
            dangerouslySetInnerHTML={{
              __html: (record.zh || record.en || record.fr).summary,
            }}
          />
        );
      },
    },
    {
      dataIndex: 'opearate',
      title: '操作',
      width: 100,
      render: (_, record) => {
        if ((record.zh || record.en || record.fr)?.isDeleted) return '已删除';
        return (
          <div className={tw`flex gap-2`}>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setId(record.groupId);
              }}
            >
              查看
            </Button>
            <Button
              type="dashed"
              disabled={(record.zh || record.en || record.fr).isPublish}
              onClick={() => {
                Modal.confirm({
                  title: '发布',
                  content: '确定发布吗',
                  onOk: async () => {
                    await publishArticle({ groupId: record.groupId });
                    message.success('发布成功');
                    getThoughtList();
                  },
                });
              }}
            >
              发布
            </Button>
            <Button
              type="primary"
              danger
              disabled={!(record.zh || record.en || record.fr).isPublish}
              onClick={() => {
                Modal.confirm({
                  title: '取消发布',
                  content: '确定取消发布吗？',
                  onOk: async () => {
                    await unPublishArticle({ groupId: record.groupId });
                    message.success('取消发布成功');
                    getThoughtList();
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
                    await deleteArticle({ groupId: record.groupId });
                    message.success('删除成功');
                    getThoughtList();
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

  const handleAdd = () => {
    setId('');
    setOpen(true);
  };

  const getThoughtList = async () => {
    // 获取数据并设置到tableData
    const res = await queryArticleList();

    setTableData(res);
    setDislayList(
      ((res || []) as any[]).filter((i: any) =>
        filters === 'all'
          ? !(i.zh || i.en || i.fr)?.isDeleted
          : (i.zh || i.en || i.fr)?.isDeleted,
      ),
    );
  };

  useEffect(() => {
    getThoughtList();
  }, []);

  useUpdateEffect(() => {
    setDislayList(
      ((tableData || []) as any[]).filter((i: any) =>
        filters === 'all'
          ? !(i.zh || i.en || i.fr)?.isDeleted
          : (i.zh || i.en || i.fr)?.isDeleted,
      ),
    );
  }, [filters]);

  return (
    <div>
      <div className={tw`mb-2`}>
        <Button onClick={handleAdd} type="primary">
          新增
        </Button>
      </div>{' '}
      <Tabs onChange={(val) => setFilters(val)} activeKey={filters}>
        {Options.map((i) => (
          <Tabs.TabPane tab={i.label} key={i.value} />
        ))}
      </Tabs>
      <Table
        columns={columns}
        pagination={false}
        dataSource={displayList}
        rowKey={(record) => record.groupId}
      />
      {open && <EditThought query={getThoughtList} />}
    </div>
  );
};

export default ThoughtList;
