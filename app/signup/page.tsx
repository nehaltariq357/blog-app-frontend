"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setError("");


        try {

            const response = await fetch(
                "http://localhost:5000/api/signup",
                {
                    method: "POST",

                    headers:{
                        "Content-Type":"application/json",
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),

                    credentials:"include",
                }
            );


            const data = await response.json();


            // HTTP status check
            if(!response.ok){

                setError(data.message || "Signup failed");
                return;

            }


            console.log(
                "Signup success:",
                data
            );


            // redirect after success
            router.push("/login");


            // clear inputs
            setName("");
            setEmail("");
            setPassword("");


        } catch(error){

            console.log(error);

            setError("Something went wrong");

        }

    };


    return (

        <form onSubmit={handleSubmit}>


            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />


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
                Signup
            </button>


        </form>

    );
}