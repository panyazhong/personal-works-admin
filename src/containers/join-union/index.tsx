import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { tw } from "twind";
import { css } from "twind/css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const { Item } = Form;
const { Dragger } = Upload;

const JoinUnion = () => {
  const [value, setValue] = useState("");
  const [form] = Form.useForm();

  const click = async () => {
    const valids = await form.validateFields();
    if (!value) {
      return;
    }
    console.log(valids);
  };
  return (
    <div className={tw`w-full flex justify-center items-center`}>
      <div className={tw`w-[80%] max-w-[1000px]`}>
        <Form
          layout="vertical"
          form={form}
          className={tw`
            ${css`
              .ant-form-item .ant-form-item-label > label {
                color: #fff !important;
              }
              .anticon {
                color: #fff !important;
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
            <Input.TextArea rows={10} placeholder="文章简介" />
          </Item>
          <Item
            label="文章内容"
            className={tw`text-frc-100`}
            rules={[
              {
                required: true,
                message: "请填写文章内容",
              },
            ]}
          >
            <ReactQuill
              style={{
                height: "800px",
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

        <Button className={tw`w-full border-none mt-[50px]`} onClick={click}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default JoinUnion;
