import React from "react";

export default function AlreadyAccount({ signIn }) {
  return (
    <div className="font-light text-[#7c818c] text-[0.95rem] md:text-[1.0rem]   ">
      {signIn ? "Already have an account?" : "Don't have an account?"}

      <a
        href="/auth/signin"
        className=" hover:text-blue-300 text-blue-400 underline underline-offset-4 font-medium pl-1"
      >
        {signIn ? "Sign In" : "Sign Up"}
      </a>
    </div>
  );
}
