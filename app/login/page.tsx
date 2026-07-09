"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setError("");


    try {

      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",

          headers:{
            "Content-Type":"application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),

          // JWT cookies ke liye
          credentials:"include",
        }
      );


      const data = await response.json();


      if(!response.ok){

        setError(
          data.message || "Login failed"
        );

        return;
      }


      console.log(
        "Login success:",
        data
      );


      // login successful
      router.push("/createPost");


      setEmail("");
      setPassword("");


    } catch(err){

      console.log(
        "Login error:",
        err
      );

      setError(
        "Something went wrong"
      );

    }

  };


  return (

    <form onSubmit={handleSubmit}>

      <h1>
        Login
      </h1>


      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />


      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />


      {
        error && (
          <p>
            {error}
          </p>
        )
      }


      <button type="submit">
        Login
      </button>


    </form>

  );
};


export default Login; 