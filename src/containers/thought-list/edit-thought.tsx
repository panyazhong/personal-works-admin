import { Form, Input, Modal, Upload, UploadProps } from "antd";
import { useAtom } from "jotai";
import { useState } from "react";
import ReactQuill from "react-quill";
import { tw } from "twind";
import { css } from "twind/css";
import { thoughtDetailIdAtom, thoughtOpenAtom } from ".";
import { InboxOutlined } from "@ant-design/icons";

const { Item } = Form;
const { Dragger } = Upload;

const EditThought = () => {
  const [open, setOpen] = useAtom(thoughtOpenAtom);
  const [id] = useAtom(thoughtDetailIdAtom);
  const [value, setValue] = useState("");
  const [form] = Form.useForm();

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const title = id ? "编辑" : "新增";

  const click = async () => {
    const valids = await form.validateFields();
    if (!value) {
      return;
    }
    console.log(valids);
  };

  return (
    <Modal
      centered
      open={open}
      title={title}
      width={800}
      onClose={() => {
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}
      className={tw`
        ${css`
          .ant-modal-footer {
            margin-top: 80px;
          }
        `} 
      `}
    >
      <Form
        layout="vertical"
        form={form}
        className={tw`
          text-frc-200
            ${css`
              .ant-form-item .ant-form-item-label > label {
                color: #000 !important;
              }
              .anticon {
                color: #000 !important;
              }
            `}
          `}
      >
        <Item
          label="文章标题"
          name="title"
          rules={[
            {
              required: true,
              message: "请填写文章标题",
            },
          ]}
        >
          <Input placeholder="文章标题" />
        </Item>
        <Item
          label="文章简介"
          name="desc"
          rules={[
            {
              required: true,
              message: "请填写文章简介",
            },
          ]}
        >
          <Input.TextArea rows={5} placeholder="文章简介" />
        </Item>
        <Item
          label="封面上传"
          name="desc"
          rules={[
            {
              required: true,
              message: "请填写文章简介",
            },
          ]}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Item>
        <Item
          label="文章内容"
          className={tw`text-frc-300`}
          rules={[
            {
              required: true,
              message: "请填写文章内容",
            },
          ]}
        >
          <ReactQuill
            style={{
              height: "500px",
            }}
            theme="snow"
            value={value}
            onChange={setValue}
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"], // toggled buttons
                ["blockquote", "code-block"],

                // [{ header: [1, 2, false] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }],
                [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                [{ direction: "rtl" }], // text direction

                // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                [{ font: [] }],
                [{ align: [] }],

                // ["clean"], // remove formatting button

                ["link", "image", "video"], // link and image, video
              ],
            }}
          />
        </Item>
      </Form>
    </Modal>
  );
};

export default EditThought;
