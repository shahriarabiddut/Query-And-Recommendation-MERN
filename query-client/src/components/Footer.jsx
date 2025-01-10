import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaMessage, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Footer = () => {
  const { showToast } = useAuth();
  const handleSub = (e) => {
    e.preventDefault();
    const form = e.target;
    showToast("Thanks! We Will Contact You Soon!", "success");
    form.reset();
  };
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-11/12 mx-auto">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to={"/pages/about"} className="hover:text-gray-100">
                  About
                </Link>
              </li>
              <li>
                <Link to={"/pages/contact"} className="hover:text-gray-100">
                  Contact
                </Link>
              </li>
              <li>
                <Link to={"/pages/faq"} className="hover:text-gray-100">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={"/queries/all"} className="hover:text-gray-100">
                  All Queries
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Connect with us
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={"https://www.facebook.com/"}
                  className="hover:text-gray-100 flex items-center gap-2"
                >
                  <FaFacebook className="text-xl" /> Facebook
                </Link>
              </li>
              <li>
                <Link
                  to={"https://www.twitter.com/"}
                  className="hover:text-gray-100 flex items-center gap-2"
                >
                  <FaXTwitter className="text-xl" /> Twitter
                </Link>
              </li>
              <li>
                <Link
                  to={"https://www.linkedin.com/"}
                  className="hover:text-gray-100 flex items-center gap-2"
                >
                  <FaLinkedin className="text-xl" /> LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  to={"https://www.instagram.com/"}
                  className="hover:text-gray-100 flex items-center gap-2"
                >
                  <FaInstagram className="text-xl" /> Instagram
                </Link>
              </li>
            </ul>
          </div>

          <div className="dropAMessage">
            <h5 className="text-xl font-bold mb-4">Get Offers Newsetters</h5>
            <p className="text-gray-400 mb-4"></p>
            <form onSubmit={handleSub} method="POST">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-md mb-2 text-black bg-[#1F1F1F]"
                required
              />
              <button
                type="submit"
                className="bg-buttonBG text-white py-2 px-4 rounded-md w-full"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaMessage className="text-3xl text-blue-600" />
            <span className="text-white text-2xl font-semibold font-barlow">
              {import.meta.env.VITE_NAME || "ProRecommendation"}
            </span>
          </div>
          <p className="text-sm mt-4 sm:mt-0">
            Copyright © {new Date().getFullYear()}. Developed By &nbsp;
            <span className="font-semibold text-white font-rancho text-xl ">
              Shahriar Ahmed Biddut
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
