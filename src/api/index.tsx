import axios from './httpRequest';
import { AddPaint, Exhibition, IThought } from './interface';

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
      url: '/article/queryArticleList',
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
      url: '/article/delete',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const publishArticle = (data: { groupId: string }) => {
  return axios
    .request({
      url: '/article/publish',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const unPublishArticle = (data: { groupId: string }) => {
  return axios
    .request({
      url: '/article/unPublish',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const addArticle = (data: any) => {
  return axios
    .request({
      url: '/article/add',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const editArticle = (data: any) => {
  return axios
    .request({
      url: '/article/update',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const uploadArticle = (data: any) => {
  return axios
    .request({
      url: '/article/upload',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data;
    });
};

/** ---------------paint----------------------------- */
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
      url: '/paint/delete',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const publishPaint = (data: { groupId: string }) => {
  return axios
    .request({
      url: '/paint/publish',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const unPublishPaint = (data: { groupId: string }) => {
  return axios
    .request({
      url: '/paint/unPublish',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const addPaint = (data: AddPaint) => {
  return axios
    .request({
      url: '/paint/add',
      method: 'post',
      data,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
const uploadPaint = (data: any) => {
  return axios
    .request({
      url: '/paint/upload',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data;
    });
};
const updatePaint = (data: any) => {
  return axios
    .request({
      url: '/paint/update',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};

/** ----------------------news-------------------------- */
const uploadExhibition = (data: any) => {
  return axios
    .request({
      url: '/exhibition/upload',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data;
    });
};
const addExhibition = (data: Partial<Exhibition>) => {
  return axios
    .request({
      url: '/exhibition/add',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return Promise.reject(err);
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
      url: '/exhibition/publish',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const publishExhibition = (data: { groupId: string }) => {
  return axios
    .request({
      url: '/exhibition/publish',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const unPublishExhibition = (data: { groupId: string }) => {
  return axios
    .request({
      url: '/exhibition/unPublish',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};
const updateExhibition = (data: any) => {
  return axios
    .request({
      url: '/exhibition/update',
      method: 'post',
      data,
    })
    .then((res) => {
      return res.data;
    });
};

/** ----------------------applyList---------------------- */
const queryApplyList = () => {
  return axios
    .request({
      url: '/apply/queryApplyList',
      method: 'post',
    })
    .then((res) => {
      return res.data;
    });
};
const updateApplyList = (params: { id: string; isPass: 0 | 1 }) => {
  return axios
    .request({
      url: '/apply/queryApplyList',
      method: 'post',
      data: params,
    })
    .then((res) => {
      return res.data;
    });
};

export {
  login,
  // article
  queryArticleList,
  queryArticleDetail,
  deleteArticle,
  publishArticle,
  unPublishArticle,
  addArticle,
  editArticle,
  uploadArticle,
  // paint
  queryPaintList,
  queryPaintDetail,
  deletePaint,
  publishPaint,
  unPublishPaint,
  uploadPaint,
  addPaint,
  updatePaint,
  // news
  uploadExhibition,
  addExhibition,
  queryExhibitionList,
  queryExhibitionDetail,
  deleteExhibition,
  publishExhibition,
  unPublishExhibition,
  updateExhibition,
  // applyList
  queryApplyList,
  updateApplyList,
};
