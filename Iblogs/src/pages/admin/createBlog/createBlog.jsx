import React, { useState, useContext } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import myContext from "../../../context/data/myContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import axios from "axios"; // Axios for Cloudinary
import { fireDB } from "../../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function CreateBlog() {
  const context = useContext(myContext);
  const { mode } = context;
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState({
    title: "",
    category: "",
    content: "",
    time: Timestamp.now(),
  });
  const [thumbnail, setThumbnail] = useState();
  const [loading, setLoading] = useState(false); // To handle loading state

  //* Add Post Function
  const addPost = async (imageUrl) => {
    if (!blogs.title || !blogs.category || !blogs.content || !imageUrl) {
      toast.error("Please fill all fields");
      return;
    }

    const productRef = collection(fireDB, "blogPost");
    try {
      await addDoc(productRef, {
        title: blogs.title,
        category: blogs.category,
        content: blogs.content,
        thumbnail: imageUrl,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      navigate("/dashboard");
      toast.success("Post added successfully");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  //* Upload Image to Cloudinary
  const uploadImage = async () => {
    if (!thumbnail) {
      toast.error("Please select a thumbnail");
      return;
    }

    setLoading(true); // Start loading spinner
    const formData = new FormData();
    formData.append("file", thumbnail);
    formData.append("upload_preset", "picoooo"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dzjj2nlta/image/upload`,
        formData
      );
      const imageUrl = response.data.secure_url; // Get the uploaded image URL
      setLoading(false); // Stop loading spinner
      addPost(imageUrl); // Pass the image URL to the addPost function
    } catch (error) {
      setLoading(false);
      toast.error("Image upload failed");
      console.error("Cloudinary upload error:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-6">
      <div
        className="p-5"
        style={{
          background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
          borderBottom:
            mode === "dark"
              ? "4px solid rgb(226, 232, 240)"
              : "4px solid rgb(30, 41, 59)",
        }}
      >
        <div className="mb-2 flex justify-between">
          <div className="flex gap-2 items-center">
            <Link to={"/dashboard"}>
              <BsFillArrowLeftCircleFill size={25} />
            </Link>
            <Typography
              variant="h4"
              style={{
                color: mode === "dark" ? "white" : "black",
              }}
            >
              Create Blog
            </Typography>
          </div>
        </div>

        {/* Thumbnail Input */}
        <div className="mb-3">
          {thumbnail && (
            <img
              className="w-full rounded-md mb-3"
              src={URL.createObjectURL(thumbnail)}
              alt="thumbnail"
            />
          )}
          <Typography
            variant="small"
            className="mb-2 font-semibold"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            Upload Thumbnail
          </Typography>
          <input
            type="file"
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
            style={{
              background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
            }}
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </div>

        {/* Blog Title Input */}
        <div className="mb-3">
          <input
            placeholder="Enter Your Title"
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5"
            style={{
              background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
            }}
            onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
            value={blogs.title}
          />
        </div>

        {/* Blog Category Input */}
        <div className="mb-3">
          <input
            placeholder="Enter Your Category"
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5"
            style={{
              background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
            }}
            onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
            value={blogs.category}
          />
        </div>

        {/* Text Editor */}
        <Editor
          apiKey="yilgdx1hjm5s1p3ue1d94z83upwel9gjg1z6ygwt4k1qwku6"
          onEditorChange={(newValue) =>
            setBlogs({ ...blogs, content: newValue })
          }
          init={{
            plugins: "autolink lists link image preview",
          }}
        />

        {/* Submit Button */}
        <Button
          className="w-full mt-5"
          onClick={uploadImage}
          disabled={loading} // Disable button during loading
          style={{
            background:
              mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
            color: mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
          }}
        >
          {loading ? "Uploading..." : "Submit Post"}
        </Button>
      </div>
    </div>
  );
}

export default CreateBlog;
