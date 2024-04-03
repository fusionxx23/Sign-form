import React from "react";

export default function SignupHeaders({ h1, h2 }) {
  return (
    <>
      <div className="font-poppins font-[700] text-[1.4rem] md:text-[2.0rem] xl:text-[2.2rem] text-white">
        Create a Free Account<span className="text-blue-400">.</span>
      </div>
      <div className="font-poppins text-[#7c818c] font-[500] text-[1.1rem] md:text-[1.5rem] xl:text-[1.5rem]   ">
        {h2}
      </div>
    </>
  );
}
