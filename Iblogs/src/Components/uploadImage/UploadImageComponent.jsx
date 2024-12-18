import { useState } from "react";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";

const cloudName = "dzjj2nlta";
const apiKey = "917316836911585";
const apiSecret = "*********************************";

function UploadImageComponent() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const uploadImage = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your-upload-preset");

    fetch(`https://api.cloudinary.com/v1_1/${cldzjj2nlta}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image uploaded:", data.url);
        // Use the image URL for the blog post
      })
      .catch((error) => console.error("Error uploading image:", error));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default UploadImageComponent;
