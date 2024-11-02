import {
  Alert,
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Radio,
  Upload,
  UploadProps,
} from 'antd';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import { tw } from 'twind';
import { css } from 'twind/css';
import { thoughtDetailIdAtom, thoughtOpenAtom } from '.';
import { InboxOutlined } from '@ant-design/icons';
import {
  addArticle,
  editArticle,
  queryArticleDetail,
  uploadPaint,
} from '../../api';

const { Item } = Form;
const { Dragger } = Upload;

const EditThought = ({ query }: { query: () => void }) => {
  const [open, setOpen] = useAtom(thoughtOpenAtom);
  const [id] = useAtom(thoughtDetailIdAtom);
  const [language, setLanguage] = useState('zh');
  const [form] = Form.useForm();

  const isEdit = useMemo(() => id, [id]);

  const [cacheInfo, setCacheInfo] = useState<any>();
  const [displayInfo, setDisplayInfo] = useState<any>({});

  const defaultValue = {
    language: 'zh',
  };

  const props: UploadProps = {
    beforeUpload: () => false,
    onChange(info) {
      const fd = new FormData();
      fd.append('file', info.file as unknown as Blob);

      uploadPaint(fd).then((res) => {
        setDisplayInfo((prev: any) => {
          return {
            ...prev,
            imgPath: res,
          };
        });
      });
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const title = isEdit ? '编辑' : '新增';

  const click = async () => {
    try {
      const info = {
        ...displayInfo,
      };
      if (isEdit) {
        info.groupId = id;
      }
      const params = {
        [language]: {
          ...info,
        },
      };

      if (isEdit) {
        await editArticle({ ...params });
      } else {
        await addArticle(params);
      }

      message.success('操作成功');

      query();
      setOpen(false);
    } catch (error) {
      message.error('操作失败');
    }
  };

  const getThoughtDetail = async () => {
    const res = await queryArticleDetail({ groupId: id });

    setCacheInfo(res);
  };

  const handleDisplay = (key: string, val: any) => {
    setDisplayInfo((prev: any) => {
      return {
        ...prev,
        [key]: val,
      };
    });
  };

  useEffect(() => {
    if (open) {
      if (id) {
        getThoughtDetail();
      }

      form.setFieldsValue(defaultValue);
    }
  }, [open]);

  useEffect(() => {
    setDisplayInfo((cacheInfo || {})[language] || {});
  }, [language, cacheInfo]);

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
      footer={
        <>
          {
            <>
              <Button onClick={() => setOpen(false)}>取消</Button>
              <Button onClick={click} type="primary">
                确认
              </Button>
            </>
          }
        </>
      }
    >
      <Alert message="三种语言版本需要分别提交保存！！！" banner />

      <Form
        layout="vertical"
        form={form}
        key={language}
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
              setLanguage(e.target.value);
            }}
          >
            <Radio value={'zh'}>中文</Radio>
            <Radio value={'en'}>英文</Radio>
            <Radio value={'fr'}>法语</Radio>
          </Radio.Group>
        </Item>
        <Item
          label="文章标题"
          rules={[
            {
              required: true,
              message: '请填写文章标题',
            },
          ]}
        >
          <Input
            placeholder="文章标题"
            value={displayInfo.title}
            onChange={(e) => {
              handleDisplay('title', e.target.value);
            }}
          />
        </Item>
        <Item
          label="作者"
          rules={[
            {
              required: true,
              message: '请填写作者',
            },
          ]}
        >
          <Input
            placeholder="请填写作者"
            value={displayInfo.author}
            onChange={(e) => {
              handleDisplay('author', e.target.value);
            }}
          />
        </Item>
        <Item
          label="文章简介"
          rules={[
            {
              message: '请填写文章简介',
            },
          ]}
        >
          <Input.TextArea
            placeholder="文章简介"
            rows={4}
            value={displayInfo.summary}
            onChange={(e) => {
              handleDisplay('summary', e.target.value);
            }}
          />
        </Item>

        <Item
          label="封面上传"
          rules={[
            {
              // required: true,
              // message: '请填写文章简介',
            },
          ]}
        >
          {id && displayInfo?.imgPath && (
            <Image
              src={`http://www.nanfang-art.com/home/pic${displayInfo?.imgPath}`}
              height={200}
              preview={false}
            />
          )}
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
              message: '请填写文章内容',
            },
          ]}
        >
          <ReactQuill
            style={{
              height: '500px',
            }}
            theme="snow"
            value={displayInfo.content || ''}
            onChange={(val) => {
              handleDisplay('content', val);
            }}
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                ['blockquote', 'code-block'],

                // [{ header: [1, 2, false] }],
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
