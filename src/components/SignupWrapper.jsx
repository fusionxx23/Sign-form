import React from "react";

export default function SignWrapper({ children }) {
  return (
    <div className="grid  xl:grid-cols-2">
      <div className="h-[100svh]  w-full flex items-center justify-center bg-black">
        <div className="bg-black p-8 lg:min-w-[700px] xl:min-w-[600px] rounded-lg">
          {children}
        </div>
      </div>
      <div className="flex h-[100svh] items-center text-center">
        <div className=" w-full">
          <h1 className="text-center">Lorem Ipsum text</h1>
          <h2 className="text-center">Lorem ipsum text sdfsdf sdfsd</h2>
        </div>
      </div>
    </div>
  );
}
