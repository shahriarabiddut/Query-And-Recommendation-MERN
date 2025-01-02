import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaMessage, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-100">About</a></li>
              <li><a href="#" className="hover:text-gray-100">Contact</a></li>
              <li><a href="#" className="hover:text-gray-100">Careers</a></li>
              <li><a href="#" className="hover:text-gray-100">Advertising</a></li>
            </ul>
          </div>

          {/* Legal Stuff Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Legal Stuff</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-100">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-100">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-100">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-100">Knowledge Base</a></li>
              <li><a href="#" className="hover:text-gray-100">Support</a></li>
            </ul>
          </div>

          {/* Connect with Us Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Connect with us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-100 flex items-center gap-2"><FaFacebook className="text-xl"/> Facebook</a></li>
              <li><a href="#" className="hover:text-gray-100 flex items-center gap-2"><FaXTwitter className="text-xl"/> Twitter</a></li>
              <li><a href="#" className="hover:text-gray-100 flex items-center gap-2"><FaLinkedin className="text-xl"/> LinkedIn</a></li>
              <li><a href="#" className="hover:text-gray-100 flex items-center gap-2"><FaInstagram className="text-xl"/> Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaMessage className="text-3xl text-blue-600"/>
            <span className="text-white text-2xl font-semibold font-barlow">{import.meta.env.VITE_NAME || 'ProRecommendation'}</span>
          </div>
          <p className="text-sm mt-4 sm:mt-0">
            Copyright © 2024 <span className="font-semibold text-white font-rancho text-xl ">Shahriar Ahmed Biddut</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
