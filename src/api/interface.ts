export interface Article {
  author: string;
  content: string;
  createBy: number;
  createTime: string;
  groupId: number;
  id: number;
  imgPath: string;
  isDeleted: boolean;
  isPublish: boolean;
  language: string;
  summary: string;
  title: string;
  updateBy: number;
  updateTime: string;
  groupId: number;
}

export interface IThought {
  en: Article | null;
  fr: Article | null;
  zh: Article | null;
  groupId: number;
}
