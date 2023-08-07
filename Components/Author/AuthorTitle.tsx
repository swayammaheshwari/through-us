import React from "react";
import Image from "next/image";

const AuthorTitle = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 col-md-offset-2">
          <div className="mainheading">
            <div className="row post-top-meta authorpage">
              <div className="col-md-10 col-xs-12">
                <h1>
                  Hi,{" "}
                  <span style={{ color: "#68D1DE" }}>
                    <h1>Swayam Maheshwari </h1>
                  </span>{" "}
                  here
                </h1>
                <span className="author-description">
                  creator of <strong>&quot;Throughus.com&quot;</strong> Webapp
                  that you&apos;re currently previewing. We professionally
                  develop premium themes & Webapp.You can find us on the social
                  links below.
                </span>
                <div className="sociallinks">
                  <a target="_blank" href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <span className="dot"></span>{" "}
                  <a target="_blank" href="#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                </div>
                <a href="#" className="btn follow">
                  Follow
                </a>
              </div>
              <div className="col-md-2 col-xs-12">
                <Image
                  className="author-thumb"
                  src="/assets/img/avatar.png"
                  alt="Sal"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorTitle;
