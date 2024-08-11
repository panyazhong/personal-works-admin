import axios from "./httpRequest";
import { IThought } from "./interface";

const login = (data: {
  username: string;
  password: string;
}): Promise<{ token: string }> => {
  return axios
    .request({
      url: "/login",
      method: "post",
      data,
    })
    .then((res) => {
      return res.data;
    });
};

const queryArticleList = (): Promise<IThought[]> => {
  return axios
    .request({
      url: "/article/queryArticleList",
      method: "post",
    })
    .then((res) => {
      return res.data;
    });
};
const queryArticleDetail = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/article/queryArticleDetail",
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
      url: "/paint/queryPaintList",
      method: "post",
    })
    .then((res) => {
      return res.data;
    });
};
const queryPaintDetail = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/paint/queryPaintDetail",
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
      url: "/exhibition/queryExhibitionList",
      method: "post",
    })
    .then((res) => {
      return res.data;
    });
};
const queryExhibitionDetail = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/exhibition/queryExhibitionDetail",
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
  queryPaintList,
  queryPaintDetail,
  queryExhibitionList,
  queryExhibitionDetail,
};
