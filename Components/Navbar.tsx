"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";

const Navbar = () => {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <LoadingBar
        color="#68D1DE"
        progress={progress}
        loaderSpeed={1000}
        onLoaderFinished={() => setProgress(0)}
      />
      <nav className="navbar navbar-toggleable-md navbar-light bg-white fixed-top mediumnavigation">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container">
          <Link className="navbar-brand" href="/">
            <Image
              id="logo"
              src="/assets/img/logo.png"
              alt="logo"
              width={20}
              height={20}
            />
          </Link>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" href="/">
                  <div onClick={() => setProgress(progress + 90)}>Stories</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/author">
                  <div onClick={() => setProgress(progress + 90)}>Author</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contact">
                  <div onClick={() => setProgress(progress + 90)}>
                    Contact Us
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/signin">
                  <div onClick={() => setProgress(progress + 90)}>Sign in</div>
                </Link>
              </li>
            </ul>

            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
              />
              <span className="search-icon">
                <svg
                  className="svgIcon-use"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                >
                  <path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"></path>
                </svg>
              </span>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
