import {
  Alert,
  Checkbox,
  Form,
  Image,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Switch,
  Upload,
  UploadProps,
} from 'antd';
import { useAtom } from 'jotai';
import { FC, useEffect, useMemo, useState } from 'react';
import { tw } from 'twind';
import { css } from 'twind/css';
import { thoughtDetailIdAtom, paintingOpenAtom } from '.';
import { InboxOutlined } from '@ant-design/icons';
import {
  addPaint,
  queryArticleList,
  queryPaintDetail,
  updatePaint,
  uploadPaint,
} from '../../api';
import { useAsyncEffect } from 'ahooks';

import { IThought, LanguageEnum } from '../../api/interface';

const { Item } = Form;
const { Dragger } = Upload;

interface IProps {
  query: () => void;
}

const EditThought: FC<IProps> = (props) => {
  const [open, setOpen] = useAtom(paintingOpenAtom);
  const [id] = useAtom(thoughtDetailIdAtom);

  const [language, setLanguage] = useState<LanguageEnum>(LanguageEnum.zh);
  const [isRelated, setIsRelated] = useState<boolean>(false);
  const [relatedArticle, setRelatedArticle] = useState<any>();
  const [articleList, setArticleList] = useState<IThought[]>([]);

  const isEdit = useMemo(() => id, [id]);

  const [cacheInfo, setCacheInfo] = useState<any>();
  const [displayInfo, setDisplayInfo] = useState<any>({});
  const [form] = Form.useForm();

  const upProps: UploadProps = {
    name: 'file',
    multiple: true,
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
      if (isRelated) {
        params.articleGroupId = relatedArticle;
      }

      if (isEdit) {
        await updatePaint(params);
      } else {
        await addPaint(params as any);
      }

      message.success('新增成功');
      props.query();
      setOpen(false);
    } catch (error) {
      message.error('新增失败');
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

  /** -----------------effects---------------------- */

  useAsyncEffect(async () => {
    if (open) {
      const l = await queryArticleList();
      setArticleList(l);
      if (id) {
        const res = await queryPaintDetail({ groupId: id });
        setCacheInfo(res);
        if (res.articleInfo) {
          setIsRelated(true);
          setRelatedArticle(JSON.parse(res.articleInfo).articleGroupId);
        }
      }
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
      key={open ? 'open' : 'close'}
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
            onChange={(e) => setLanguage(e.target.value)}
          >
            <Radio value={'zh'}>中文</Radio>
            <Radio value={'en'}>英文</Radio>
            <Radio value={'fr'}>法语</Radio>
          </Radio.Group>
        </Item>
        <Item label="是否置顶至轮播图">
          <Switch
            checked={displayInfo?.topPosition === 1}
            onChange={(checked) => {
              handleDisplay('topPosition', checked ? 1 : 0);
            }}
          />
        </Item>
        <Item
          label="作品标题"
          rules={[
            {
              required: true,
              message: '请填写作品标题',
            },
          ]}
        >
          <Input
            placeholder="作品标题"
            value={displayInfo.title}
            onChange={(e) => {
              handleDisplay('title', e.target.value);
            }}
          />
        </Item>
        <Item
          label="作品描述"
          name="content"
          rules={[
            {
              required: false,
              message: '请填写作品相关描述',
            },
          ]}
        >
          <Input.TextArea
            placeholder="作品描述"
            rows={4}
            value={displayInfo.content}
            onChange={(e) => {
              handleDisplay('summary', e.target.value);
            }}
          />
        </Item>
        <Item
          label="作者"
          name="author"
          rules={[
            {
              required: true,
              message: '请填写作者',
            },
          ]}
        >
          <Input
            placeholder="作者"
            value={displayInfo.author}
            onChange={(e) => {
              handleDisplay('author', e.target.value);
            }}
          />
        </Item>
        <Checkbox
          checked={isRelated}
          onChange={(e) => setIsRelated(e.target.checked)}
        >
          是否关联文章
        </Checkbox>
        {isRelated && (
          <Item label="关联文章">
            <Select
              options={articleList.map((i) => ({
                label: i.zh?.title,
                value: i.groupId,
              }))}
              value={relatedArticle}
              onChange={(v) => {
                setRelatedArticle(v);
              }}
            />
          </Item>
        )}
        <Item
          label="上传作品"
          rules={[
            {
              required: true,
              message: '请上传作品',
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
      </Form>
    </Modal>
  );
};

export default EditThought;
