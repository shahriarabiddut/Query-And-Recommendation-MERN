import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import contact from "../assets/photo/contact.jpg";

const Contact = () => {
  const { showToast } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("We will contact you soon!", "");
    e.target.reset();
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: `url(${contact})`,
      }}
    >
      <div className="bg-black bg-opacity-70 py-20 ">
        <Helmet>
          <title>Contact | EquiSports</title>
        </Helmet>
        <div className="min-h-screen flex flex-col justify-center items-center w-11/12 mx-auto ">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-center text-4xl font-bold text-cyan-800 font-barlow mb-6">
              Contact Form
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  name="mrinfo"
                  placeholder="I am..."
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <textarea
                  name="message"
                  rows={5}
                  placeholder="How Can We Help You?"
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>
              <div className="form-control">
                <button
                  type="submit"
                  className="btn bg-buttonBG text-white font-semibold w-full hover:bg-red-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-white w-full max-w-4xl">
            {/* Email Info */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-800 p-4 rounded-full mb-4">
                <FaEnvelope className="text-3xl" />
              </div>
              <h4 className="text-xl font-semibold">Email Us</h4>
              <p className="text-sm">info@email.com</p>
            </div>

            {/* Phone Info */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-800 p-4 rounded-full mb-4">
                <FaPhoneAlt className="text-3xl" />
              </div>
              <h4 className="text-xl font-semibold">Call Us</h4>
              <p className="text-sm">+88 - 01861396965</p>
            </div>

            {/* Address Info */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-800 p-4 rounded-full mb-4">
                <FaMapMarkerAlt className="text-3xl" />
              </div>
              <h4 className="text-xl font-semibold">Visit Us</h4>
              <p className="text-sm">
                785 15th Street, Office 478 <br /> Berlin, De 81566
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
