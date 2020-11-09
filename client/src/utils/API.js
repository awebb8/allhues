import axios from "axios";

// const url = "https://api.cloudinary.com/v1_1/dsi7lpcmx/image/upload";
// const preset = "askckkso";
export default {
  getKits: function () {
    return axios.get("/api/kits");
  },
  postKit: function (kit) {
    return axios.post(`/api/kits`, kit);
  },
  //   postImageToCloudinary: async function(){
  //       return await axios.post(url,)
  //   }
};
