import React from "react";

const Featured = () => {
  return (
    <div className="flex flex-col gap-14 items-center justify-center py-10">
      <div className="heading font-bold text-4xl flex flex-col gap-3 items-center justify-center">
        Featured Categories
        <div className="underline w-[80%] h-2 bg-[#ffe26e]"></div>
      </div>
      <div className="featured_catagory flex w-full justify-between items-center gap-10 flex-wrap">
        <div className="men w-[290px] max-w-[90vw] aspect-[1/1.7] relative">
          <img
            src="/images/menFashion.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="shopbtn px-4 py-1 rounded-full bg-[#ffe26e] absolute right-3 bottom-3 hover:bg-transparent hover:text-white border-2 border-[#ffe26e] font-medium duration-300">
            Shop
          </div>
        </div>
        <div className="men w-[290px] max-w-[90vw] aspect-[1/1.7] relative">
          <img
            src="/images/womwn.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="shopbtn px-4 py-1 rounded-full bg-[#ffe26e] absolute right-3 bottom-3 hover:bg-transparent hover:text-white border-2 border-[#ffe26e] font-medium duration-300">
            Shop
          </div>
        </div>
        <div className="men w-[290px] max-w-[90vw] aspect-[1/1.7] relative">
          <img
            src="/images/kids-2.jpeg"
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="shopbtn px-4 py-1 rounded-full bg-[#ffe26e] absolute right-3 bottom-3 hover:bg-transparent hover:text-white border-2 border-[#ffe26e] font-medium duration-300">
            Shop
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
