import { Button, Table, TableColumnType } from "antd";
import { tw } from "twind";
import Editpainting from "./edit-painting";
import { atom, useAtom } from "jotai";
import PaintingPreview from "./painting-preview";

export const paintingOpenAtom = atom(false);
export const previewOpenAtom = atom(false);
export const thoughtDetailIdAtom = atom("");

const PaintingList = () => {
  const [open, setOpen] = useAtom(paintingOpenAtom);
  const [previewOpen, setPreviewOpen] = useAtom(previewOpenAtom);
  const [, setId] = useAtom(thoughtDetailIdAtom);
  const columns: TableColumnType<any>[] = [
    {
      dataIndex: "name",
      title: "名称",
    },
    {
      dataIndex: "opearate",
      title: "操作",
      render: (text, record, index) => {
        return (
          <div className={tw`flex gap-2`}>
            <Button
              type="link"
              onClick={() => {
                setPreviewOpen(true);
              }}
            >
              查看图片
            </Button>
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

      {open && <Editpainting />}
      {previewOpen && <PaintingPreview />}
    </div>
  );
};

export default PaintingList;
