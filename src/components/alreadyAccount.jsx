import React from "react";

export default function AlreadyAccount() {
  return (
    <div className="font-light text-[#7c818c] text-[0.95rem] md:text-[1.0rem]   ">
      Already have an account?
      <a
        href="/auth/signin"
        className=" hover:text-blue-300 text-blue-400 underline underline-offset-4 font-medium pl-1"
      >
        Sign In
      </a>
    </div>
  );
}
