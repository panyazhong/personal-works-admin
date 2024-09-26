import { Button, message, Modal, Table, TableColumnType, Tabs } from 'antd';
import { tw } from 'twind';
import Editpainting from './edit-painting';
import { atom, useAtom } from 'jotai';
import PaintingPreview from './painting-preview';
import {
  deletePaint,
  publishPaint,
  queryPaintList,
  unPublishPaint,
} from '../../api';
import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'ahooks';

export const paintingOpenAtom = atom(false);
export const previewOpenAtom = atom(false);
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

const PaintingList = () => {
  const [open, setOpen] = useAtom(paintingOpenAtom);
  const [previewOpen, setPreviewOpen] = useAtom(previewOpenAtom);
  const [, setId] = useAtom(thoughtDetailIdAtom);
  const [filters, setFilters] = useState<any>('all');

  const [paintings, setPaintings] = useState([]);
  const [displayList, setDislayList] = useState([]);
  const [previewPath, setPreviewPath] = useState('');

  const columns: TableColumnType<any>[] = [
    {
      dataIndex: 'name',
      title: '名称',
      render: (_, record) => {
        return (
          <div
            className={tw`cursor-pointer`}
            onClick={() => {
              setPreviewPath(record.zh.imgPath);
              setPreviewOpen(true);
            }}
          >
            {record.zh.title}
          </div>
        );
      },
    },
    {
      dataIndex: 'opearate',
      title: '操作',
      render: (_, record) => {
        if (record?.zh?.isDeleted) return '已删除';
        return (
          <div className={tw`flex gap-2`}>
            <Button
              type="link"
              onClick={() => {
                setPreviewPath(record.zh.imgPath);
                setPreviewOpen(true);
              }}
            >
              查看图片
            </Button>
            {/* <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setId(record.groupId);
              }}
            >
              编辑
            </Button>{' '} */}
            <Button
              type="dashed"
              disabled={record.zh.isPublish}
              onClick={() => {
                Modal.confirm({
                  title: '发布',
                  content: '确定发布吗',
                  onOk: async () => {
                    await publishPaint({ groupId: record.groupId });
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
              disabled={!record.zh.isPublish}
              onClick={() => {
                Modal.confirm({
                  title: '取消发布',
                  content: '确定取消发布吗？',
                  onOk: async () => {
                    await unPublishPaint({ groupId: record.groupId });
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
                    await deletePaint({ groupId: record.groupId });
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

  const query = () => {
    queryPaintList().then((res) => {
      setPaintings(res);
      setDislayList(
        (res || []).filter((i: any) =>
          filters === 'all' ? !i.zh?.isDeleted : i.zh?.isDeleted,
        ),
      );
    });
  };

  const handleAdd = () => {
    setId('');
    setOpen(true);
  };

  useEffect(() => {
    query();
  }, []);

  useUpdateEffect(() => {
    setDislayList(
      (paintings || []).filter((i: any) =>
        filters === 'all' ? !i.zh?.isDeleted : i.zh?.isDeleted,
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
      <Table columns={columns} pagination={false} dataSource={displayList} />
      {open && <Editpainting query={query} />}
      {previewOpen && <PaintingPreview imgPath={previewPath} />}
    </div>
  );
};

export default PaintingList;
