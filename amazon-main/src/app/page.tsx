"use client";

import NavbarHeader from "@/component/NavbarHeader";

import AuthenEnd from "@/component/Footer/AuthenEnd";
import AmazonCarousel from "../component/Carousel";
import AmazonProduct from "../component/Product";
import CarouselSlick from "../component/CarouselSlick";

export default function Home() {
  return (
    <>
      <NavbarHeader />
      <AmazonCarousel />
      <div className="mt-64">
        <AmazonProduct />
      </div>
      <CarouselSlick />
      <AuthenEnd />
    </>
  );
}
