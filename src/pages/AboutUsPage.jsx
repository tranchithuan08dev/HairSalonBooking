import React from "react";
import "../assets/css/contact.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

function ContactPage() {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="hero bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to Hair Harmony</h1>
          <p className="lead">Where beauty meets perfection.</p>
        </div>
      </div>
      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <h2 className="service-title text-3xl font-semibold text-black text-center">
            About Us
          </h2>
          <p className="text-center">
            At Hair Harmony, we believe that your hair is your crown, and it
            deserves the utmost care and attention. As a premier hair salon, we
            pride ourselves on offering personalized services tailored to each
            client's unique style and preferences.
          </p>
          <p className="text-center">
            Our team of highly skilled and experienced stylists is dedicated to
            delivering top-quality results. From cutting-edge haircuts to the
            latest trends in hair coloring and treatments, we ensure that every
            visit to our salon is a luxurious and transformative experience. We
            work with the finest products in the industry, prioritizing the
            health and vitality of your hair.
          </p>
          <p className="text-center">
            Beyond just hair care, we strive to create an environment where you
            feel relaxed, pampered, and confident. Whether you're looking for a
            complete transformation or just a touch-up, Hair Harmony is
            committed to making you look and feel your best.
          </p>
        </div>
        <div className="row">
          {/* Main Image */}
          <div className="col-md-8">
            <img
              src={`https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
              alt="Team Photo"
              className="img-fluid rounded"
            />
          </div>
          {/* Side Images */}
          <div className="col-md-4">
            <div className="row mb-4">
              <div className="col-12">
                <img
                  src={`https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt="Service 1"
                  className="img-fluid rounded"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <img
                  src={`https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt="Service 2"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="core-values" className="py-5 bg-light">
        <div className="container">
          <h2 className="service-title text-3xl font-semibold text-black text-center">
            Core Values
          </h2>

          <div className="row justify-content-center">
            {/* Value 1 - Innovation */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="icon text-center mb-3">
                    <img
                      src="https://30shine.com/static/media/ic_about_1.f72c3bc3.svg"
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="text-black text-center fw-bold">Innovation</h5>
                  <ul className="list-unstyled">
                    <li>
                      Always believe in having a different perspective and
                      approach in every situation
                    </li>
                    <li>Emphasize CTM-KNR solutions</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Value 2 - Care */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="icon text-center mb-3">
                    <img
                      src="https://30shine.com/static/media/ic_about_2.4556df90.svg"
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="text-black text-center fw-bold">Care</h5>
                  <ul className="list-unstyled">
                    <li>Go the extra mile to bring value to everyone</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Value 3 - Passion for Learning */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="icon text-center mb-3">
                    <img
                      src="https://30shine.com/static/media/ic_about_3.76bde7a7.svg"
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="text-black text-center fw-bold">
                    Passion for Learning
                  </h5>
                  <ul className="list-unstyled">
                    <li>Share knowledge and experience with everyone</li>
                    <li>
                      Recognize the importance of both theory and practical
                      experience
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Value 4 - Sincerity */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="icon text-center mb-3">
                    <img
                      src="https://30shine.com/static/media/ic_about_4.1a7c1210.svg"
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="text-black text-center fw-bold">Sincerity</h5>
                  <ul className="list-unstyled">
                    <li>
                      Listen to understand the emotions and desires of others
                    </li>
                    <li>Clearly express your emotions and needs</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Value 5 - Encouraging Growth */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="icon text-center mb-3">
                    <img
                      src="https://30shine.com/static/media/ic_about_5.8e9a8123.svg"
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="text-black text-center fw-bold">
                    Encouraging Growth
                  </h5>
                  <ul className="list-unstyled">
                    <li>Believe that everyone can shine</li>
                    <li>Leaders are ready to empower</li>
                    <li>We take ownership of our work</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8" style={{ marginBottom: "20px" }}>
        <div className="text-center mb-6">
          <h2 className="service-title text-3xl font-semibold text-black">
            Find Us
          </h2>
          <p className="text-gray-600">
            Locate us on the map and visit our Harmony Salon
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Harmony Salon Address
            </h3>
            <p className="text-gray-700 mb-2">123 Harmony Street</p>
            <p className="text-gray-700 mb-2">Binh Thanh District</p>
            <p className="text-gray-700 mb-2">Ho Chi Minh City, Vietnam</p>
            <p className="text-gray-700">Phone: (0123) 456 789</p>
          </div>

          <div className="col-span-1 md:col-span-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105376067!2d106.80730271151613!3d10.841127589267007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1727717121372!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
