import React, { useContext } from "react";
import Layout from "../../../Components/layout/Layout";
import myContext from "../../../context/data/myContext";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const context = useContext(myContext);
  const { mode, getAllBlog = [], deleteBlogs } = context; // Default to an empty array
  const navigate = useNavigate();

  //* Logout Function
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Layout>
      <div className="py-10">
        {/* Profile Section */}
        <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
          <div className="left">
            <img
              className="w-40 h-40 object-cover rounded-full border-2 border-pink-600 p-1"
              src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
              alt="profile"
            />
          </div>
          <div className="right">
            <h1
              className="text-center font-bold text-2xl mb-2"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Iqra Nadeem
            </h1>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              Software Developer
            </h2>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              iqranadeem713@gmail.com
            </h2>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              <span>Total Blog: </span> {getAllBlog.length}
            </h2>
            <div className="flex gap-2 mt-2">
              <Link to="/createblog">
                <Button
                  style={{
                    background:
                      mode === "dark"
                        ? "rgb(226, 232, 240)"
                        : "rgb(30, 41, 59)",
                    color: mode === "dark" ? "black" : "white",
                  }}
                  className="px-8 py-2"
                >
                  Create Blog
                </Button>
              </Link>
              <Button
                onClick={logout}
                style={{
                  background:
                    mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                  color: mode === "dark" ? "black" : "white",
                }}
                className="px-8 py-2"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Line */}
        <hr
          className={`border-2 ${
            mode === "dark" ? "border-gray-300" : "border-gray-400"
          }`}
        />

        {/* Table */}
        <div className="container mx-auto px-4 max-w-7xl my-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
            {getAllBlog.length > 0 ? (
              <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                {/* Table Header */}
                <thead
                  style={{
                    background: mode === "dark" ? "white" : "rgb(30, 41, 59)",
                  }}
                  className="text-xs"
                >
                  <tr>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      S.No
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Thumbnail
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Title
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Category
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Date
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {getAllBlog.map((item, index) => {
                    const { thumbnail, date, id, blogs } = item;
                    return (
                      <tr
                        key={id} // Unique key for each row
                        className="border-b-2"
                        style={{
                          background:
                            mode === "dark" ? "rgb(30, 41, 59)" : "white",
                        }}
                      >
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4"
                        >
                          {index + 1}.
                        </td>
                        <td className="px-6 py-4">
                          <img
                            className="w-16 rounded-lg"
                            src={thumbnail}
                            alt="thumbnail"
                          />
                        </td>
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4"
                        >
                          {blogs?.title || "No Title"}
                        </td>
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4"
                        >
                          {blogs?.category || "No Category"}
                        </td>
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4"
                        >
                          {date}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteBlogs(id)}
                            className="px-4 py-1 rounded-lg text-white font-bold bg-red-500"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <h1 className="text-center py-10 text-xl">No Blogs Found</h1>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
