import axios from "axios";

// const url = "https://api.cloudinary.com/v1_1/dsi7lpcmx/image/upload";
// const preset = "askckkso";
export default {
  getKit: function (id) {
    return axios.get(`/api/kits/${id}`);
  },
  getKits: function () {
    return axios.get("/api/kits");
  },
  postKit: function (id, kit) {
    return axios.post(`/api/kits/${id}`, kit);
  },
  // getUser: function () {
  //   return axios.get("/user");
  // },
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

  //   postImageToCloudinary: async function(){
  //       return await axios.post(url,)
  //   }
};
