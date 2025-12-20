import React from "react";
const Title = ({ title1 }) => {
  return (
    <div className="inline-flex items-center gap-3  p-3 mb-6">
      <span className="h-[3px] w-10 bg-gradient-to-r from-[#ffd900] to-black rounded-full"></span>
      <p className="text-2xl font-semibold universalfontgreatvibes bg-gradient-to-r from-[#ffd900] to-black bg-clip-text text-transparent tracking-wide p-8 ">
        {title1}
      </p>
      <span className="h-[3px] w-10 bg-gradient-to-r from-[#ffd900] to-black rounded-full"></span>
    </div>
  );
};

export default Title;
