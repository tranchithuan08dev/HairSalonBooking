import React from "react";
import "../assets/css/contact.css";
function Contact() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <h1 className="display-4">Chào Mừng Đến Với Hair Harmony</h1>
          <p className="lead">Nơi mang đến cho bạn vẻ đẹp hoàn hảo.</p>
        </div>
      </div>
      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <h2 className="text-center">Về Chúng Tôi</h2>
          <p className="text-center">
            Hair Harmony là salon tóc hàng đầu với đội ngũ chuyên viên có kinh
            nghiệm và tận tâm. Chúng tôi cung cấp các dịch vụ làm tóc chuyên
            nghiệp và chất lượng cao.
          </p>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center">Dịch Vụ Của Chúng Tôi</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Cắt Tóc</h5>
                  <p className="card-text">
                    Dịch vụ cắt tóc phù hợp với phong cách của bạn.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Nhuộm Tóc</h5>
                  <p className="card-text">
                    Sử dụng sản phẩm nhuộm chất lượng để bạn tỏa sáng.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Chăm Sóc Tóc</h5>
                  <p className="card-text">
                    Chăm sóc tóc chuyên sâu giúp tóc bạn luôn khỏe mạnh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
