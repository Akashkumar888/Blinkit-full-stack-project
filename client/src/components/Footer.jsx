import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="container mx-auto px-4 py-6 text-center flex flex-col gap-3">
        
        <p className="text-sm text-gray-600">
          © 2025 Akash Kumar. All Rights Reserved.
        </p>

        <div className="flex items-center justify-center gap-5 text-2xl">
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-200 transition-colors duration-300"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>

          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-200 transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-200 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
