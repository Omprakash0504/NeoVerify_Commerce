"use client";

import Banner from '../../components/Banner'
import Featured from "../../components/Featured";
import FeaturedItems from "../../components/FeaturedItems";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useGeneralStore from "../../store/generalStore";
import useItem from "../../store/item";
import useUser from "../../store/user";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-screen">
      <Header />
      <Banner />
      <Featured />
      <FeaturedItems />
      <Footer />
    </main>
  );
}
