import { Button, Modal, Table, TableColumnType } from "antd";
import { tw } from "twind";
import Editpainting from "./edit-painting";
import { atom, useAtom } from "jotai";
import PaintingPreview from "./painting-preview";
import {
  deletePaint,
  publishPaint,
  queryPaintList,
  unPublishPaint,
} from "../../api";
import { useEffect, useState } from "react";

export const paintingOpenAtom = atom(false);
export const previewOpenAtom = atom(false);
export const thoughtDetailIdAtom = atom("");

const PaintingList = () => {
  const [open, setOpen] = useAtom(paintingOpenAtom);
  const [previewOpen, setPreviewOpen] = useAtom(previewOpenAtom);
  const [, setId] = useAtom(thoughtDetailIdAtom);

  const [paintings, setPaintings] = useState([]);
  const [previewPath, setPreviewPath] = useState("");

  const columns: TableColumnType<any>[] = [
    {
      dataIndex: "name",
      title: "名称",
      render: (text, record, index) => {
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
      dataIndex: "opearate",
      title: "操作",
      render: (text, record, index) => {
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
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setId(record.groupId);
              }}
            >
              编辑
            </Button>{" "}
            <Button
              type="dashed"
              onClick={() => {
                Modal.confirm({
                  title: "发布",
                  content: "确定发布吗",
                  onOk: async () => {
                    await publishPaint(record.groupId);
                    message.success("发布成功");
                  },
                });
              }}
            >
              发布
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                Modal.confirm({
                  title: "取消发布",
                  content: "确定取消发布吗？",
                  onOk: async () => {
                    await unPublishPaint(record.groupId);
                    message.success("取消发布成功");
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
                  title: "删除",
                  content: "确定删除吗？",
                  onOk: async () => {
                    await deletePaint(record.groupId);
                    message.success("删除成功");
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
      console.log(res);
      setPaintings(res);
    });
  };

  const handleAdd = () => {
    setId("");
    setOpen(true);
  };

  useEffect(() => {
    query();
  }, []);

  return (
    <div>
      <div className={tw`mb-2`}>
        <Button onClick={handleAdd} type="primary">
          新增
        </Button>
      </div>
      <Table columns={columns} pagination={false} dataSource={paintings} />

      {open && <Editpainting />}
      {previewOpen && <PaintingPreview imgPath={previewPath} />}
    </div>
  );
};

export default PaintingList;
