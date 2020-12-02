import axios from "axios";

export default {
  getKit: function (id) {
    return axios.get(`/api/kits/${id}`);
  },
  getAllUsers: function () {
    return axios.get("/api/videouploads");
  },
  getKits: function () {
    return axios.get("/api/kits");
  },
  postKit: function (id, kit) {
    return axios.post(`/api/kits/${id}`, kit);
  },

  putUpdate: function (id, save) {
    return axios.put(`/api/kits/${id}`, save);
  },
  deleteKit: function (id) {
    return axios.delete(`/api/kits/${id}`);
  },
  getUser: function () {
    return axios.get("/user", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
  },
  putFavorite: function (id, kitId) {
    return axios.put(`/api/user/${id}`, kitId);
  },
  getPopulatedUsers: function (id) {
    return axios.get(`/api/users/${id}`);
  },
  updateAffiliateLinkNumbers: function (id) {
    return axios.put(`/api/kits/affiliatelink/${id}`);
  },
};
