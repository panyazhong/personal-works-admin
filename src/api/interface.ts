export enum LanguageEnum {
  en = 'en',
  zh = 'zh',
  fr = 'fr',
}

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
}

export interface IThought {
  en: Article | null;
  fr: Article | null;
  zh: Article | null;
  groupId: number;
}

type ExhibitionItem = {
  title: string;
  content: string;
  imgPath: string;
  author: string;
};
export interface Exhibition {
  zh: ExhibitionItem;
  en: ExhibitionItem;
  fr: ExhibitionItem;
}

export interface Paint {
  title: string;
  author: string;
  imgPath: string;
  topPosition: number;
}

export interface AddPaint {
  [LanguageEnum.zh]: Paint | null;
  [LanguageEnum.en]: Paint | null;
  [LanguageEnum.fr]: Paint | null;
  articleGroupId: number | null;
}
