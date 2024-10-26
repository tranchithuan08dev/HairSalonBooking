import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Booking from "../components/Home/Booking";
import Service from "../components/Home/Service";
import SroteSpace from "../components/Home/StoreSpace";
import Stylist from "../components/Home/Stylist";
import TakeCare from "../components/Home/TakeCare";
import Instagram from "../components/Home/Instagram";
import NewsBlog from "../components/Home/Newsblog";
import Map from "../components/Home/Map";

function HomePage() {
  return (
    <>
      <div className="container-fluid p-0">
        {/* Header */}
        <Header />
        {/* Header END */}
        {/* Booking */}

        <Booking />

        {/* Endbooking */}
        {/* Service */}
        <Service />

        {/* Service End */}
        {/* Store Space */}
        <SroteSpace />
        {/* End Space */}
        {/* Stylist */}
        <Stylist />

        {/* Stylist End */}
        {/* Take care */}

        <TakeCare />
        {/* Take care END */}

        {/* New Blog */}
        <NewsBlog />

        {/* Blog End */}
        {/* Ins */}
        <Instagram />
        {/* Ins end */}
        {/* Map  */}

        <Map />
        {/* Map end */}
      </div>
      {/* FOOTER  */}
      <Footer />
      {/* FOOTER END */}
    </>
  );
}

export default HomePage;
