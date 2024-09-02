import axios from './httpRequest';
import { IThought } from './interface';

const login = (data: {
  username: string;
  password: string;
}): Promise<{ token: string }> => {
  return axios
    .request({
      url: '/login',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};

const queryArticleList = (): Promise<IThought[]> => {
  return axios
    .request({
      url: '/admin/article/queryArticleList',
      method: 'post',
    })
    .then((res) => {
      return res.data;
    });
};
const queryArticleDetail = (data: { groupId: string }): Promise<IThought> => {
  return axios
    .request({
      url: '/article/queryArticleDetail',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const deleteArticle = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/article/delete",
      method: "post",
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const publishArticle = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/article/publish",
      method: "post",
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const unPublishArticle = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/article/unPublish",
      method: "post",
      data,
    })
    .then((res) => {
      return res.data;
    });
};

const queryPaintList = () => {
  return axios
    .request({
      url: '/paint/queryPaintList',
      method: 'post',
    })
    .then((res) => {
      return res.data;
    });
};
const queryPaintDetail = (data: { groupId: string }) => {
  return axios
    .request({
      url: '/paint/queryPaintDetail',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const deletePaint = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/paint/delete",
      method: "post",
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const publishPaint = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/paint/publish",
      method: "post",
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const unPublishPaint = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/paint/unPublish",
      method: "post",
      data,
    })
    .then((res) => {
      return res.data;
    });
};

/** ----------------------news-------------------------- */
const addExhibition = (data: any) => {
  return axios
    .request({
      url: "/exhibition/add",
      method: "post",
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const queryExhibitionList = () => {
  return axios
    .request({
      url: '/exhibition/queryExhibitionList',
      method: 'post',
    })
    .then((res) => {
      return res.data;
    });
};
const queryExhibitionDetail = (data: { groupId: string }) => {
  return axios
    .request({
      url: '/exhibition/queryExhibitionDetail',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const deleteExhibition = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/exhibition/publish",
      method: "post",
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const publishExhibition = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/exhibition/publish",
      method: "post",
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const unPublishExhibition = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/exhibition/unPublish",
      method: "post",
      data,
    })
    .then((res) => {
      return res.data;
    });
};
export {
  login,
  queryArticleList,
  queryArticleDetail,
  deleteArticle,
  publishArticle,
  unPublishArticle,
  queryPaintList,
  queryPaintDetail,
  deletePaint,
  publishPaint,
  unPublishPaint,
  addExhibition,
  queryExhibitionList,
  queryExhibitionDetail,
  deleteExhibition,
  publishExhibition,
  unPublishExhibition,
};
