import AuthorTitle from "@/Components/Author/AuthorTitle";
import FeatureAutherPost from "@/Components/Author/FeatureAutherPost";
import Navbar from "@/Components/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <AuthorTitle />
      <FeatureAutherPost />
    </>
  );
};

export default page;
