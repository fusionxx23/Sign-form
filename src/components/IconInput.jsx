import React from "react";

export default function iconInput({ children, ...props }) {
  return (
    <label className="input input-bordered flex items-center gap-2 w-full">
      <input {...props} className="grow" />
      {children}
    </label>
  );
}
