import React from "react";

export default function StepBtns({ check, checkField }) {
  return (
    <div className="flex justify-between  w-full">
      <button
        className="btn btn-outline"
        type="button"
        onClick={(e) => check(e, checkField, false)}
      >
        Back
      </button>
      <button className="btn btn-outline" type="submit">
        Continue
      </button>
    </div>
  );
}
