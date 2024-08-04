import axios from "axios";

const queryArticleList = () => {
  return axios
    .request({
      url: "/back/article/queryArticleList",
      method: "post",
    })
    .then((res) => {
      return res.data;
    });
};
const queryArticleDetail = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/back/article/queryArticleDetail",
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
      url: "/back/paint/queryPaintList",
      method: "post",
    })
    .then((res) => {
      return res.data;
    });
};
const queryPaintDetail = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/back/paint/queryPaintDetail",
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
      url: "/back/exhibition/queryExhibitionList",
      method: "post",
    })
    .then((res) => {
      return res.data;
    });
};
const queryExhibitionDetail = (data: { groupId: string }) => {
  return axios
    .request({
      url: "/back/exhibition/queryExhibitionDetail",
      method: "post",
      data,
    })
    .then((res) => {
      return res.data;
    });
};

export {
  queryArticleList,
  queryArticleDetail,
  queryPaintList,
  queryPaintDetail,
  queryExhibitionList,
  queryExhibitionDetail,
};
