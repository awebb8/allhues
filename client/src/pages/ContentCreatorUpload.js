import React, { useState, useEffect } from "react";
import axios from "axios";

const ContentCreatorUpload = () => {
  const [image, setImage] = useState("");
  const [kit, setKit] = useState({
    kitName: "",
    kitDescription: "",
    imageUrl: "",
    kitItems: [],
  });

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (kit.imageUrl) {
      axios.post("/api/kits", kit);
    }
  }, [kit]);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  // useEffect(() => {
  //   async function fetchImage() {
  //     const image = await axios.get('/getLatest');
  //     setImage(image.data);
  //   }
  //   fetchImage();
  //   // eslint-disable-next-line
  // }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setKit({ ...kit, [name]: value });
  };

  const url = "https://api.cloudinary.com/v1_1/dsi7lpcmx/image/upload";
  const preset = "askckkso";

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    try {
      // setLoading(true);
      const res = await axios.post(url, formData);
      const imageUrl = res.data.secure_url;
      console.log(imageUrl);

      setKit({ ...kit, imageUrl: imageUrl });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitReal = (event) => {
    event.preventDefault();
    axios.post("/api/kits", kit).then((res) => console.log(res));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 offset-sm-2">
          <h1>Kit form blahblah</h1>
          <form className="form-group">
            <input
              type="text"
              name="kitName"
              placeholder="Kit name"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="kitDescription"
              placeholder="Kit Description"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="kitItems"
              placeholder="Affiliate Link"
              //   onChange={handleInputChange}
            />
            <input type="file" name="image" onChange={onChange} />
            <button
              className="btn btn-primary"
              type="submit"
              onClick={onSubmit}
            >
              Post your kit!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentCreatorUpload;
