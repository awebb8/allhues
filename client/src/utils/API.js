import axios from "axios";

// const url = "https://api.cloudinary.com/v1_1/dsi7lpcmx/image/upload";
// const preset = "askckkso";
export default {
  getKits: function () {
    return axios.get("/api/kits", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
  },
  postKit: function (kit) {
    return axios.post(`/api/kits`, kit);
  },
  getUser: function () {
    return axios.get('/user');
  }



  //   postImageToCloudinary: async function(){
  //       return await axios.post(url,)
  //   }
};
