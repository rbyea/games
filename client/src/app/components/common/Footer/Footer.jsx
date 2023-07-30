import React from "react";

const Footer = (props) => {
  return (
    <section className="footer py-5 bg-dark section-padding">
      <div className="container">
        <div className="row py-lg-4">
          <div className="col-lg-2 col-sm-6">
            <div className="footer-brand">
              <img
                className="img-fluid"
                src="https://askbootstrap.com/preview/jarda/img/logo.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
