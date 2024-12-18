import { useAtom } from 'jotai';
import {
  Alert,
  Form,
  Image,
  Input,
  message,
  Modal,
  Radio,
  Spin,
  Upload,
  UploadProps,
} from 'antd';
import { FC, useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import { tw } from 'twind';
import { css } from 'twind/css';
import { thoughtDetailIdAtom, thoughtOpenAtom } from '.';
import { InboxOutlined } from '@ant-design/icons';
import { Exhibition, ExhibitionItem, LanguageEnum } from '../../api/interface';
import {
  addExhibition,
  queryExhibitionDetail,
  updateExhibition,
  uploadExhibition,
} from '../../api';

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

  const [cacheInfo, setCacheInfo] = useState<Partial<Exhibition>>({});
  const [displayInfo, setDisplayInfo] = useState<ExhibitionItem>(
    {} as ExhibitionItem,
  );

  const isEdit = useMemo(() => id, [id]);

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const upProps: UploadProps = {
    beforeUpload: () => false,
    onChange(info) {
      const fd = new FormData();
      fd.append('file', info.file as unknown as Blob);

      uploadExhibition(fd).then((res) => {
        setDisplayInfo((prev) => {
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

  const title = id ? '编辑' : '新增';

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
        await updateExhibition(params);
      } else {
        await addExhibition(params);
      }

      message.success('操作成功');

      props.query();
      setOpen(false);
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleDisplay = (key: string, val: any) => {
    setDisplayInfo((prev: any) => {
      return {
        ...prev,
        [key]: val,
      };
    });
  };

  const getDetail = async () => {
    setLoading(true);
    const res = await queryExhibitionDetail({ groupId: id });

    setCacheInfo(res);
    setLoading(false);
  };

  /**-------------------effects---------------- */

  useEffect(() => {
    if (open) {
      if (id) {
        getDetail();
      }

      form.setFieldsValue(init[language]);
    }
  }, [open]);

  useEffect(() => {
    setDisplayInfo((cacheInfo || {})[language] || ({} as ExhibitionItem));
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
    >
      <Alert message="三种语言版本需要分别提交保存！！！" banner />
      {loading ? (
        <div className={tw`w-full h-[200px] flex justify-center items-center`}>
          <Spin />
        </div>
      ) : (
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
          <Item label="请选择语言">
            <Radio.Group
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value as LanguageEnum);
              }}
            >
              <Radio value={LanguageEnum.zh}>中文</Radio>
              <Radio value={LanguageEnum.en}>英文</Radio>
              <Radio value={LanguageEnum.fr}>法语</Radio>
            </Radio.Group>
          </Item>
          <Item
            label="展讯标题"
            rules={[
              {
                required: true,
                message: '请填写展讯标题',
              },
            ]}
          >
            <Input
              placeholder="展讯标题"
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
                message: '请填写展讯标题',
              },
            ]}
          >
            <Input
              placeholder="展讯作者"
              value={displayInfo.author}
              onChange={(e) => {
                handleDisplay('author', e.target.value);
              }}
            />
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
            {displayInfo?.imgPath && (
              <Image
                src={`http://www.nanfang-art.com${displayInfo?.imgPath}`}
                height={200}
                preview={false}
              />
            )}
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
              value={displayInfo?.content}
              onChange={(val) => {
                handleDisplay('content', val);
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
      )}
    </Modal>
  );
};

export default EditThought;
