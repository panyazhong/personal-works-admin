import {
  Button,
  message,
  Modal,
  Radio,
  Table,
  TableColumnType,
  Tabs,
} from 'antd';
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

  const [newsList, setNewsList] = useState([]);
  const [displayList, setDislayList] = useState([]);
  const [isProcess, setIsProcess] = useState(0);

  const [loading, setLoading] = useState(false);

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
      dataIndex: 'isPass',
      title: '处理结果',
      hidden: isProcess === 0,
      render: (text) => {
        const res = text ? '已通过' : '已拒绝';
        return (
          <span
            className={tw`${
              text ? 'text-[rgb(16,188,121)]' : 'text-[rgb(250,80,81)]'
            }`}
          >
            {res}
          </span>
        );
      },
    },
    {
      dataIndex: 'opearate',
      title: '操作',
      render: (_, record) => {
        return (
          <div className={tw`flex gap-2 items-center`}>
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
                  onOk: () => {
                    handleUpdateApplyList({
                      id: record.id,
                      isPass: 0,
                    });
                  },
                });
              }}
            >
              驳回
            </Button>
            {record.filePath && (
              <a href={`http://www.nanfang-art.com${record.filePath}`} download>
                下载文件
              </a>
            )}
          </div>
        );
      },
    },
  ];

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
    setLoading(true);
    const res = await queryApplyList({ isProcess });
    setLoading(false);

    setNewsList(res);

    setDislayList(res);
  };

  useEffect(() => {
    query();
  }, [isProcess]);

  return (
    <div>
      <Radio.Group
        onChange={(e) => setIsProcess(e.target.value)}
        value={isProcess}
      >
        <Radio value={0} className={tw`text-[#fff]`}>
          未处理
        </Radio>
        <Radio value={1} className={tw`text-[#fff]`}>
          已处理
        </Radio>
      </Radio.Group>
      <Table
        columns={columns}
        pagination={false}
        dataSource={displayList}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default ApplyList;
