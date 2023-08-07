"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Post } from "@/utils/types";
import Navbar from "@/Components/Navbar";
import Link from "next/link";

interface PostProps {
  params: {
    id: string;
  };
}

const PostPage: React.FC<PostProps> = ({ params }) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/post/${params?.id}`);
        const data = await response.json();
        setPost(data.blog[0]);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    fetchPost();
  }, [params?.id]);

  if (!post) {
    return (
      <>
        <Navbar />
        <center>Loading...</center>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-xs-12">
            <div className="share">
              <p>Share</p>
              <ul>
                <li>
                  <Link target="_blank" href="">
                    <Image
                      className="svgIcon-use"
                      src="/assets/img/instagram.png"
                      alt=""
                      width={23}
                      height={23}
                    />
                  </Link>
                </li>
              </ul>
              <div className="sep"></div>
              <p>Talk</p>
              <ul>
                <li>
                  <a href="#comments">
                    42
                    <br />
                    <svg
                      className="svgIcon-use"
                      width={29}
                      height={29}
                      viewBox="0 0 29 29"
                    >
                      <path></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-8 col-md-offset-2 col-xs-12">
            <div className="mainheading">
              <div className="row post-top-meta">
                <div className="col-md-2">
                  <a href="">
                    <Image
                      className="author-thumb"
                      src="/assets/img/avatar.png"
                      alt="Sal"
                      height={20}
                      width={20}
                    />
                  </a>
                </div>
                <div className="col-md-10">
                  <a className="link-dark" href="">
                    {post.author}
                  </a>
                  <a href="#" className="btn follow">
                    Follow
                  </a>
                  <span className="author-description">
                    The post you&apos;re currently previewing was written by{" "}
                    <b>{post.author}</b>
                  </span>
                  <span className="post-date">{post.date}</span>
                  <span className="dot"></span>
                  <span className="post-read">6 min read</span>
                </div>
              </div>

              <h1 className="posttitle">{post.title}</h1>
            </div>

            <img
              className="featured-image img-fluid"
              src={`https://picsum.photos/seed/${post.image}/600/400`}
              alt=""
            />

            <div className="article-post">
              <p>{post.blog_body}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
