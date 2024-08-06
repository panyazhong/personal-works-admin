import { Button, Table, TableColumnType } from "antd";
import { tw } from "twind";
import EditThought from "./edit-news";
import { atom, useAtom } from "jotai";

export const thoughtOpenAtom = atom(false);
export const thoughtDetailIdAtom = atom("");

const NewsList = () => {
  const [open, setOpen] = useAtom(thoughtOpenAtom);
  const [, setId] = useAtom(thoughtDetailIdAtom);
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

export default NewsList;
