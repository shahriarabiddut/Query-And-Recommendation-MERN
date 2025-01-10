import React from "react";
import about from "../assets/photo/about.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <section className="min-h-screen py-10 md:py-20 gap-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mx-auto w-11/12">
      <Helmet>
        <title>About | EquiSports</title>
      </Helmet>
      <div className="col-span-1 flex items-center">
        <img src={about} alt="About Us" />
      </div>
      <div className="px-2 flex flex-col gap-2 font-sans col-span-1 md:col-span-2">
        <h1 className="text-4xl font-extrabold text-center text-cyan-600 mb-6 font-barlow">
          About Us
        </h1>

        <p className="text-lg text-gray-700 text-center mb-10">
          Welcome to{" "}
          <Link
            to={"/"}
            className="font-bold text-cyan-600 hover:text-blue-600"
          >
            {import.meta.env.VITE_NAME}
          </Link>
          , your go-to platform for discovering the best products through the
          power of community collaboration!
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              What We Do
            </h2>
            <p className="text-gray-700">
              ProRecommendation is a dynamic and interactive web application
              designed to simplify the decision-making process for product
              purchases. Whether you're looking for expert opinions, real-life
              reviews, or personalized recommendations, our platform provides
              everything you need to choose the right product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Purpose
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Provide a space for users to share product-related queries and
                seek guidance.
              </li>
              <li>
                Enable the community to contribute recommendations and share
                valuable insights.
              </li>
              <li>
                Foster meaningful discussions to empower users with the
                information they need to make better choices.
              </li>
            </ul>
          </section>

          <section>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-cyan-600 mb-2">
                  User Queries
                </h3>
                <p className="text-gray-700">
                  Post, update, or delete your product-related questions, and
                  explore a centralized feed of queries from other users for
                  inspiration and guidance.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-600 mb-2">
                  Product Recommendations
                </h3>
                <p className="text-gray-700">
                  Browse community-driven recommendations tailored to specific
                  queries, and contribute your own recommendations to help
                  others.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-600 mb-2">
                  Product Details
                </h3>
                <p className="text-gray-700">
                  Access detailed information about queries and recommended
                  products to make informed purchasing decisions.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg font-semibold text-gray-800 mb-4">
            Join our community today and start making quality recommendations
            and queries! For Better decisions!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
