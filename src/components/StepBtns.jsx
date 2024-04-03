import React from "react";

export default function StepBtns({ check, checkField }) {
  return (
    <div className="flex justify-between pt-6">
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
