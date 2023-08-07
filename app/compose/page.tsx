"use client";

import Navbar from "@/Components/Navbar";
import React from "react";
import { useRouter } from "next/navigation";

const Compose = () => {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const author = e.target.elements.author.value;
    const title = e.target.elements.title.value;
    const blog_body = e.target.elements.blog.value;

    try {
      const response = await fetch("/api/compose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, blog_body }),
      });
      const data = response.json();

      if (response.ok) {
        console.log(data);
        router.push("/");
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error(error);
    }

    e.target.reset();
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">
              Author Name
            </label>
            <input
              name="author"
              type="text"
              id="form2Example1"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">
              Title
            </label>
            <input
              name="title"
              type="text"
              id="form2Example1"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">
              Blog
            </label>
            <textarea name="blog" id="form2Example2" className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Post Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default Compose;
