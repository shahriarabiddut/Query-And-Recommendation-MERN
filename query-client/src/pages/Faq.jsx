import React from "react";
import faq from "../assets/photo/faq.png";
import { Helmet } from "react-helmet-async";

const Faq = () => {
  return (
    <section className="min-h-screen py-10 md:py-20 gap-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mx-auto w-11/12">
      <Helmet>
        <title>FAQ | EquiSports</title>
      </Helmet>
      <div className="col-span-1 flex items-center">
        <img src={faq} alt="FAQ" />
      </div>
      <div className="px-2 flex flex-col gap-2 font-sans col-span-1 md:col-span-2">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-cyan-800 font-barlow">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-500 mt-2">
            Find answers to the most common questions regarding our platform.
          </p>
        </div>
        <div className="space-y-6">
          <div className="collapse collapse-plus bg-white shadow-md rounded-lg">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-semibold text-gray-800 peer-checked:text-blue-500">
              How do I post a product query?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                To post a product query, simply log in to your account, navigate
                to the query section, and click on "Ask A Question / Add New
                Query." Fill in the required information and submit.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-white shadow-md rounded-lg">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-semibold text-gray-800 peer-checked:text-blue-500">
              How can I recommend a product?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                To recommend a product, find a query you're interested in and
                select the "Recommend" button. You can then add your
                recommendation along with product details.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-white shadow-md rounded-lg">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-semibold text-gray-800 peer-checked:text-blue-500">
              Can I edit or delete my posted queries or recommendations?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Yes! You can edit or delete your posted queries and
                recommendations from your account page. Just click on the edit
                or delete button next to the query/recommendation.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-white shadow-md rounded-lg">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-semibold text-gray-800 peer-checked:text-blue-500">
              How do I contact support if I have an issue?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                If you need assistance, you can contact our support team by
                going to the "Contact Us" page and filling out the contact form.
                We will get back to you as soon as possible.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-white shadow-md rounded-lg">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-semibold text-gray-800 peer-checked:text-blue-500">
              Is there a way to track the recommendations I’ve made?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Yes, you can track all of your recommendations in the "My
                Recommendations" section of your profile. You can see all the
                queries you've recommended products for, along with any feedback
                received.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
