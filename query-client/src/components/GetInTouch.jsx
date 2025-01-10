import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const GetInTouch = () => {
  const { showToast } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("We will contact you Soon!", "");
    e.target.reset();
  };
  return (
    <section className="bg-gray-200">
      <div className=" min-h-screen py-20 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-auto w-11/12 ">
        <div className=" grid w-10/12  mx-auto">
          <form
            className="card-body shadow-lg rounded-lg bg-white"
            onSubmit={handleSubmit}
          >
            <h3 className="text-center text-5xl mx-auto font-barlow font-bold my-3 text-blue-600">
              Send A Quote
            </h3>
            <div className="form-control">
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                name="mrinfo"
                placeholder="I am....."
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <textarea
                name="message"
                rows={20}
                id=""
                defaultValue="How Can We Help You?"
                className="h-20 p-1 input input-bordered"
                required
              ></textarea>
            </div>
            <div className="form-control my-6">
              <button
                type="submit"
                className="btn bg-buttonBG text-white font-semibold hover:bg-red-700 hover:font-bold hover:text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="px-2 flex flex-col gap-4 font-barlow">
          <h2 className="lg:text-left text-center text-xl font-semibold">
            Contact Us
          </h2>
          <h2 className="lg:text-left text-center text-6xl font-bold">
            Have questions?
            <br />
            Get in touch!
          </h2>
          <p className="lg:text-left text-center text-2xl text-gray-500">
            785 15h Street, Office 478 <br /> Berlin, De 81566 <br />
            info@email.com
          </p>
          <div className="flex gap-4 font-semibold font-montserrat justify-center lg:justify-start">
            <div className="text-2xl p-5 bg-buttonBG text-white rounded-xl">
              <FaPhoneAlt />{" "}
            </div>
            <div className="text-2xl space-y-1">
              <p>Call to ask any question</p> <p>+88 - 01861396965</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
