import React from "react";

const Footer = () => {
  return (
    <div className="w-full px-[10%] py-8 flex justify-between items-center mt-16 bg-[#ffe26e]">
      <div className="help flex flex-col">
        <div className="header font-semibold text-2xl">Help</div>
        <div className="item">Shipping</div>
        <div className="item">Refund</div>
        <div className="item">FAQ</div>
        <div className="item">Accessiblity</div>
      </div>
      <div className="help flex flex-col">
        <div className="header font-semibold text-2xl">Contact Us</div>
        <div className="item">+91 826 069 3117</div>
        <div className="item">sahooomprakash219@gmail.com</div>
        <div className="item">Bhawanipatna,Kalahandi</div>
      </div>
      <div className="help flex flex-col">
        <div className="header font-semibold text-2xl">Stay Connected</div>
        <div className="item">
          <a href="https://www.instagram.com/omprakash_sahoo.rsr/">Instagram</a>{" "}
          | <a href="https://www.youtube.com/">Youtube</a> |
          <a href="https://www.linkedin.com/in/om-prakash-sahoo-9241b2235/">
             linkdin
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
