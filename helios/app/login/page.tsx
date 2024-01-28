"use client"

import React from "react";
import { login, verifyJWT } from "../api";
import { useMutation } from "@tanstack/react-query";
import { verify } from "crypto";


export default function LoginPage() {

    const verifyMutation = useMutation({
        mutationFn: () => {
            return verifyJWT()
        }
    })

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <h4>This is some text</h4>
          </div>
        </div>
        <LoginForm />
        <button onClick={() => verifyMutation.mutate()}>VerifyJwt</button>
      </div>
    </main>
  );
}

function LoginForm() {
    const loginMutation = useMutation({
        mutationFn: (event: any) => {
            event.preventDefault()
            var email = ""
            var password = ""
            try {
                email = event.target.email.value
                password = event.target.password.value

                if (!password || !email)
                    throw new Error("Data is not in expected format")

            } catch (e) {
                throw new Error(`Cound not decode form data ${e}`)
            }

            return login({email, password})
        }
    })

    return (
        <form onSubmit={loginMutation.mutate}>
             <label
               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
               htmlFor="email"
             >
               Email
             </label>
            <input
                className="text-gray-900"
                id="email"
                type="email"
                name="email"
                placeholder="user@example.com"
                required
            />

             <label
               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
               htmlFor="password"
             >
               Password
             </label>
             <input
                 className="text-gray-900"
                 id="password"
                 type="password"
                 name="password"
                 placeholder="Enter password"
                 required
                 minLength={8}
             />
             <button className="block my-4">Login</button>
             { loginMutation.isPending && (<h4>Loading...</h4>) }
        </form>
    )
}
