import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <p className="pull-left">Copyright &copy; 2023 ThroughUs.com</p>
      <p className="pull-right">
        Developed by{" "}
        <a target="_blank" href="/author">
          Swayam Maheshwari
        </a>
      </p>
      <div className="clearfix"></div>
    </div>
  );
};

export default Footer;
