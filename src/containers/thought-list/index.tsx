import { Button, Table } from "antd";
import { ColumnType } from "antd/es/list";
import { ColumnProps } from "antd/es/table";
import { tw } from "twind";
import EditThought from "./edit-thought";
import { atom, useAtom } from "jotai";

export const thoughtOpenAtom = atom(false);
export const thoughtDetailIdAtom = atom("");

const ThoughtList = () => {
  const [open, setOpen] = useAtom(thoughtOpenAtom);
  const [, setId] = useAtom(thoughtDetailIdAtom);
  const columns: ColumnType[] = [
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
  return (
    <div>
      <>
        <Button onClick={handleAdd} type="primary">
          新增
        </Button>
      </>
      <Table
        columns={columns}
        pagination={false}
        dataSource={[
          {
            name: "123",
          },
        ]}
      />

      {open && <EditThought />}
    </div>
  );
};

export default ThoughtList;
