import { Button, message, Modal, Table, TableColumnType, Tabs } from 'antd';
import { tw } from 'twind';
import { atom, useAtom } from 'jotai';
import { queryApplyList, updateApplyList } from '../../api';
import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'ahooks';

export const thoughtOpenAtom = atom(false);
export const thoughtDetailIdAtom = atom('');

const ApplyList = () => {
  const [open, setOpen] = useAtom(thoughtOpenAtom);
  const [, setId] = useAtom(thoughtDetailIdAtom);
  const [filters, setFilters] = useState<any>('all');

  const columns: TableColumnType<any>[] = [
    {
      dataIndex: 'name',
      title: '姓名',
      width: '100px',
    },
    {
      dataIndex: 'email',
      title: '邮箱',
      width: '200px',
    },
    {
      dataIndex: 'phone',
      title: '手机号',
      width: '100px',
    },
    {
      dataIndex: 'information',
      title: '补充信息',
    },
    {
      dataIndex: 'opearate',
      title: '操作',
      render: (_, record) => {
        return (
          <div className={tw`flex gap-2`}>
            <Button
              type="primary"
              onClick={() => {
                handleUpdateApplyList({
                  id: record.id,
                  isPass: 1,
                });
              }}
            >
              同意
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                Modal.confirm({
                  title: '驳回',
                  content: '确定驳回吗',
                  onOk: handleUpdateApplyList({
                    id: record.id,
                    isPass: 0,
                  }),
                });
              }}
            >
              驳回
            </Button>
            <a download={`http://www.nanfang-art.com${record.filePath}`}>
              下载文件
            </a>
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

  const handleUpdateApplyList = async (params: any) => {
    const res = await updateApplyList(params);
    message.success(params.isPass === 1 ? '同意成功' : '驳回成功');
    query();
  };

  const query = async () => {
    const res = await queryApplyList();
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
        rowKey="id"
      />
    </div>
  );
};

export default ApplyList;
