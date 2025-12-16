import { useState } from "react";

function Details({work, time}) {
  return (
    <div className="max-w-sm rounded-2xl bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-xl mt-10">
      <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
        More Details
      </h3>

      <div className="flex justify-between py-2">
        <span className="font-medium text-gray-600">Work:</span>
        <span className="text-gray-800">{work}</span>
      </div>

      <div className="flex justify-between py-2">
        <span className="font-medium text-gray-600">Time:</span>
        <span className="text-gray-800">{time}</span>
      </div>
    </div>
  );
}

export default Details;
