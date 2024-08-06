import { Button, Table, TableColumnType } from "antd";
import { tw } from "twind";
import EditThought from "./edit-thought";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { queryArticleList } from "../../api";

export const thoughtOpenAtom = atom(false);
export const thoughtDetailIdAtom = atom("");

interface IThought {
  name: string;
  desc: string;
  opearate: string;
}

const ThoughtList = () => {
  const [open, setOpen] = useAtom(thoughtOpenAtom);
  const [, setId] = useAtom(thoughtDetailIdAtom);
  const [tableData, setTableData] = useState<IThought[]>([]);
  const columns: TableColumnType<any>[] = [
    {
      dataIndex: "name",
      title: "名称",
    },
    {
      dataIndex: "desc",
      title: "文章简介",
    },
    {
      dataIndex: "opearate",
      title: "操作",
      render: (text, record, index) => {
        return (
          <div className={tw`flex gap-2`}>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setId(record.groupId);
              }}
            >
              编辑
            </Button>
            <Button type="primary" danger>
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  const handleAdd = () => {
    setId("");
    setOpen(true);
  };

  const getThoughtList = async () => {
    // 获取数据并设置到tableData
    const res = await queryArticleList();

    if (res.code === 200) {
      setTableData(res.data);
    }
  };

  useEffect(() => {
    getThoughtList();
  }, []);
  return (
    <div>
      <div className={tw`mb-2`}>
        <Button onClick={handleAdd} type="primary">
          新增
        </Button>
      </div>
      <Table
        columns={columns}
        pagination={false}
        dataSource={tableData}
        rowKey={(record) => record.groupId}
      />

      {open && <EditThought />}
    </div>
  );
};

export default ThoughtList;
