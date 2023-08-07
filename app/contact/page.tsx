"use client";

import Navbar from "@/Components/Navbar";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Compose = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(
      new Promise<void>((resolve, reject) => {
        if (form.current) {
          emailjs
            .sendForm(
              "service_qb6pjnh",
              "template_37ir1bg",
              form.current,
              "_AfEq1vih8ORBEiBl"
            )
            .then(
              (result) => {
                if (result.text) {
                  resolve();
                } else {
                  reject();
                }
              },
              (error) => {
                reject();
                console.log(error.text);
              }
            );
        }
      }),
      {
        pending: "Sending Email...",
        success: "Email Sent Successfully",
        error: "Failed to Send Email",
      }
    );
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container">
        <form ref={form} onSubmit={sendEmail}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">
              Your Name
            </label>
            <input
              name="user_name"
              type="text"
              id="form2Example1"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">
              Your email
            </label>
            <input
              name="user_email"
              type="email"
              id="form2Example1"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">
              Message
            </label>
            <textarea
              name="message"
              id="form2Example2"
              className="form-control"
            />
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
