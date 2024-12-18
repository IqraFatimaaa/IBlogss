import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../Components/loader/loader";
import Layout from "../../Components/layout/Layout";
import Comment from "../../Components/comment/Comment";
import toast from "react-hot-toast";

function BlogInfo() {
  const context = useContext(myContext);
  const { mode, setloading, loading } = context;

  const { id } = useParams(); // Destructure id from params

  //* Blog State
  const [getBlogs, setGetBlogs] = useState(null);

  //* Fetch Blog Details
  const getAllBlogs = async () => {
    setloading(true);
    try {
      const blogDoc = await getDoc(doc(fireDB, "blogPost", id));
      if (blogDoc.exists()) {
        setGetBlogs(blogDoc.data());
      } else {
        console.error("Blog post does not exist.");
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      toast.error("Failed to load blog details.");
    } finally {
      setloading(false);
    }
  };

  //* Comments States
  const [fullName, setFullName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [allComment, setAllComment] = useState([]);

  //* Add a New Comment
  const addComment = async () => {
    if (!fullName || !commentText) {
      return toast.error("Please fill in both fields.");
    }
    const commentRef = collection(fireDB, `blogPost/${id}/comment`);
    try {
      await addDoc(commentRef, {
        fullName,
        commentText,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      toast.success("Comment added successfully!");
      setFullName("");
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };

  //* Fetch Comments
  const getComments = () => {
    try {
      const q = query(
        collection(fireDB, `blogPost/${id}/comment`),
        orderBy("time", "desc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const commentsArray = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAllComment(commentsArray);
      });
      return unsubscribe; // Cleanup subscription
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments.");
    }
  };

  //* Effect: Fetch Blog and Comments on Mount
  useEffect(() => {
    getAllBlogs();
    const unsubscribeComments = getComments();
    return () => unsubscribeComments?.(); // Cleanup listener
  }, [id]); // Re-fetch when id changes

  //* Create Markup for Blog Content
  function createMarkup(content) {
    return { __html: content };
  }

  return (
    <Layout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4">
        <div className="py-4 lg:py-8">
          {loading ? (
            <Loader />
          ) : (
            getBlogs && (
              <div>
                {/* Blog Thumbnail */}
                <img
                  alt="Blog Thumbnail"
                  className="mb-3 rounded-lg h-full w-full"
                  src={getBlogs.thumbnail}
                />
                {/* Title and Date */}
                <div className="flex justify-between items-center mb-3">
                  <h1
                    style={{ color: mode === "dark" ? "white" : "black" }}
                    className="text-xl md:text-2xl lg:text-2xl font-semibold"
                  >
                    {getBlogs.blogs?.title}
                  </h1>
                  <p style={{ color: mode === "dark" ? "white" : "black" }}>
                    {getBlogs.date}
                  </p>
                </div>
                <div
                  className={`border-b mb-5 ${
                    mode === "dark" ? "border-gray-600" : "border-gray-400"
                  }`}
                />
                {/* Blog Content */}
                <div
                  className="content"
                  dangerouslySetInnerHTML={createMarkup(
                    getBlogs.blogs?.content || ""
                  )}
                ></div>
              </div>
            )
          )}
          {/* Comments Section */}
          <Comment
            addComment={addComment}
            commentText={commentText}
            setcommentText={setCommentText}
            allComment={allComment}
            fullName={fullName}
            setFullName={setFullName}
          />
        </div>
      </section>
    </Layout>
  );
}

export default BlogInfo;
