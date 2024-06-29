"use client";
import React from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import useItem from "../../../store/item";
import Items from "../../../components/Items";

const page = () => {
  const { item } = useItem();
  return (
    <main className="flex min-h-screen flex-col items-center w-screen">
      <Header />
      <div className="flex-1 flex flex-wrap gap-10 px-10 w-full items-center justify-center my-10">
        {item.map((ele, ind) => {
            console.log(ele)
          return ele.category=='men' ? <Items item={ele} />:<></>;
        })}
      </div>
      <Footer />
    </main>
  );
};

export default page;
