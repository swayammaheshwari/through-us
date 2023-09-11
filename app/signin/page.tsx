"use client";

import Navbar from "@/Components/Navbar";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });

      if (response.ok) {
        router.push("/compose");
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error(error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example31"
                  checked
                  readOnly
                />
                <label className="form-check-label" htmlFor="form2Example31">
                  Remember me
                </label>
              </div>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>

          <div className="text-center">
            <p>
              Not a member? <Link href="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
