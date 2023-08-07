"use client";

import Navbar from "@/Components/Navbar";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      const response = await fetch("/api/signup", {
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

    e.target.reset();
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
              name="email"
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
              name="password"
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Register
          </button>

          <div className="text-center">
            <p>
              Already a member? <Link href="/signin">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
