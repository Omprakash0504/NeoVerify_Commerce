import React from "react";

const Banner = () => {
  return (
    <div className="banner w-full h-[65vh] bg-[#ffe26e] flex items-center justify-center gap-16 overflow-hidden">
      <div className="details flex flex-col gap-6">
        <div className="discount text-lg font-medium ml-2">
          Up To 15% Discount
        </div>
        <div className="Header text-6xl font-bold">
          Checkout The Best <br /> Fashion Style
        </div>
        <div className="shop_btn px-4 py-2 flex-grow-0 border-2 border-black hover:bg-black hover:text-white duration-500 rounded-full flex items-center justify-center self-start cursor-pointer">
          Shop Now
        </div>
      </div>
      <img
        src="images/banner.png"
        alt=""
        className="h-full hidden lg:flex hover:scale-110 duration-300"
      />
    </div>
  );
};

export default Banner;
