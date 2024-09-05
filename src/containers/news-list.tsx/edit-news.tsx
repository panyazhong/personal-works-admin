import { useAtom } from 'jotai';
import {
  Alert,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Upload,
  UploadProps,
} from 'antd';
import { FC, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { tw } from 'twind';
import { css } from 'twind/css';
import { thoughtDetailIdAtom, thoughtOpenAtom } from '.';
import { InboxOutlined } from '@ant-design/icons';
import { Exhibition, LanguageEnum } from '../../api/interface';
import { useUpdateEffect } from 'ahooks';
import { addExhibition, uploadPaint } from '../../api';

const { Item } = Form;
const { Dragger } = Upload;

const init = {
  [LanguageEnum.zh]: null,
  [LanguageEnum.en]: null,
  [LanguageEnum.fr]: null,
};

const EditThought: FC<{ query: () => void }> = (props) => {
  const [open, setOpen] = useAtom(thoughtOpenAtom);
  const [id] = useAtom(thoughtDetailIdAtom);
  const [language, setLanguage] = useState<LanguageEnum>(LanguageEnum.zh);
  const [operateInfo, setOperateInfo] = useState<Exhibition>(init);

  const [form] = Form.useForm();

  const upProps: UploadProps = {
    beforeUpload: () => false,
    onChange(info) {
      const fd = new FormData();
      fd.append('file', info.file as unknown as Blob);

      uploadPaint(fd).then((res) => {
        setOperateInfo((prev) => {
          return {
            ...prev,
            [language]: {
              ...prev[language],
              imgPath: res,
            },
          };
        });
      });
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const title = id ? '编辑' : '新增';

  const click = async () => {
    try {
      const valids = await form.validateFields();

      const params = {
        ...operateInfo,
        [language]: {
          ...operateInfo[language],
          ...valids,
        },
      };

      await addExhibition(params);

      message.success('操作成功');

      props.query();
      setOpen(false);
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleValusChange = (val: Exhibition[LanguageEnum.zh]) => {
    setOperateInfo((prev) => {
      return {
        ...prev,
        [language]: {
          ...prev[language],
          ...val,
        },
      };
    });
  };

  /**-------------------effects---------------- */
  useEffect(() => {
    if (open) {
      form.setFieldsValue(init[language]);
    }
  }, [open]);

  useUpdateEffect(() => {
    console.log(operateInfo[language]);
    form.setFieldsValue(operateInfo[language] || { title: '', author: '' });
  }, [language]);

  return (
    <Modal
      centered
      open={open}
      title={title}
      width={800}
      onOk={click}
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
      <Alert message="三种语言版本需要分别提交保存！！！" banner />
      <Form
        layout="vertical"
        form={form}
        onValuesChange={(cvals, vals) => {
          handleValusChange(vals);
        }}
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
        <Item label="请选择语言">
          <Radio.Group
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value as LanguageEnum);

              form.setFieldsValue(operateInfo[language]);
            }}
          >
            <Radio value={LanguageEnum.zh}>中文</Radio>
            <Radio value={LanguageEnum.en}>英文</Radio>
            <Radio value={LanguageEnum.fr}>法语</Radio>
          </Radio.Group>
        </Item>
        <Item
          label="展讯标题"
          name="title"
          rules={[
            {
              required: true,
              message: '请填写展讯标题',
            },
          ]}
        >
          <Input placeholder="展讯标题" />
        </Item>
        <Item
          label="作者"
          name="author"
          rules={[
            {
              required: true,
              message: '请填写展讯标题',
            },
          ]}
        >
          <Input placeholder="展讯标题" />
        </Item>
        <Item
          label="封面上传"
          // name="imgPath"
          rules={[
            {
              required: true,
              message: '请上传封面',
            },
          ]}
        >
          <Dragger {...upProps}>
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
          label="展讯内容"
          className={tw`text-frc-300`}
          rules={[
            {
              required: true,
              message: '请填写展讯内容',
            },
          ]}
        >
          <ReactQuill
            style={{
              height: '500px',
            }}
            theme="snow"
            value={operateInfo[language]?.content}
            onChange={(val) => {
              handleValusChange({
                ...operateInfo[language],
                content: val,
              } as Exhibition[LanguageEnum.zh]);
            }}
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                ['blockquote', 'code-block'],

                // 1, 2, false] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                [{ direction: 'rtl' }], // text direction

                // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                [{ font: [] }],
                [{ align: [] }],

                // ["clean"], // remove formatting button

                ['link', 'image', 'video'], // link and image, video
              ],
            }}
          />
        </Item>
      </Form>
    </Modal>
  );
};

export default EditThought;
