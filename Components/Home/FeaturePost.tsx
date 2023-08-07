"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";
import LoadingBar from "react-top-loading-bar";

const FeaturePost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/home");
        const data = await response.json();
        console.log(data.blogs);
        setPosts(data.blogs);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <LoadingBar
        color="#68D1DE"
        progress={progress}
        loaderSpeed={1000}
        onLoaderFinished={() => setProgress(0)}
      />
      <section className="featured-posts container">
        <div className="section-title">
          <h2>
            <span>Featured</span>
          </h2>
        </div>
        <div className="card-columns listfeaturedtag">
          {posts.map((post) => (
            <div className="card" key={post._id}>
              <div className="row">
                <div className="col-md-5 wrapthumbnail">
                  <Link href={`/post/${post._id}`}>
                    <div
                      className="thumbnail"
                      style={{
                        backgroundImage: `url(https://picsum.photos/seed/${post.image}/200/300)`,
                      }}
                      onClick={() => setProgress(progress + 90)}
                    ></div>
                  </Link>
                </div>
                <div className="col-md-7">
                  <div className="card-block">
                    <h2 className="card-title">
                      <Link href={`/post/${post._id}`}>
                        <div onClick={() => setProgress(progress + 90)}>
                          {post.title}
                        </div>
                      </Link>
                    </h2>
                    <h4 className="card-text">
                      {post.blog_body.substring(0, 50) + "..."}
                    </h4>
                    <div className="metafooter">
                      <div className="wrapfooter">
                        <span className="meta-footer-thumb">
                          <a href="/author">
                            <Image
                              className="author-thumb"
                              src="/assets/img/avatar.png"
                              alt="swayam"
                              width={20}
                              height={20}
                            />
                          </a>
                        </span>
                        <span className="author-meta">
                          <span className="post-name">
                            <a href="/author">{post.author}</a>
                          </span>
                          <br />
                          <span className="post-date">{post.date}</span>
                        </span>
                        <span className="post-read-more">
                          <a href="/post" title="Read Story">
                            <svg
                              className="svgIcon-use"
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                            >
                              <path
                                d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturePost;
