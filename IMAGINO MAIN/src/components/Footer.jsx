import React from 'react';
import { Instagram, Linkedin, Github } from 'lucide-react';
import Skillcypher1 from '../images/Skillcypher1.png';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-300 rounded-b-2xl mt-10">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col items-center md:items-start w-full md:w-1/4">
          <img src={Skillcypher1} alt="Skillcypher Logo" className="h-35 w-32 -my-7" width="128" height="140" loading="lazy" decoding="async" />
          <p className="text-sm text-gray-600 mb-2 text-center md:text-left">Connect with us on social media<br />for the latest updates and insights.</p>
          <div className="flex flex-row gap-3 mb-1">
            <a href="https://instagram.com/" aria-label="Instagram" className="text-gray-500 hover:text-pink-500 text-xl" target="_blank" rel="noopener noreferrer"><Instagram /></a>
            <a href="https://linkedin.com/" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-700 text-xl" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
            <a href="https://github.com/" aria-label="GitHub" className="text-gray-500 hover:text-black text-xl" target="_blank" rel="noopener noreferrer"><Github /></a>
          </div>
          <span className="text-xs text-gray-400">(Logo's)</span>
        </div>
        {/* Company */}
        <div className="w-full md:w-1/4">
          <h3 className="font-semibold text-lg mb-2 text-center md:text-left">COMPANY</h3>
          <ul className="text-gray-700 text-sm space-y-1 text-center md:text-left">
            <li>About Us</li>
            <li>Support</li>
            <li>
              <a href="/src/policies/Privacy Policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
            </li>
            <li>
              <a href="/src/policies/Terms and Conditions.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms and Conditions</a>
            </li>
            <li>
              <a href="/src/policies/Pricing and Refund Policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">Pricing & Refund Policy</a>
            </li>
          </ul>
        </div>
        {/* Community */}
        <div className="w-full md:w-1/4">
          <h3 className="font-semibold text-lg mb-2 text-center md:text-left">COMMUNITY</h3>
          <ul className="text-gray-700 text-sm space-y-1 text-center md:text-left">
            <li>Our whatsapp<br />community</li>
          </ul>
        </div>
        {/* Reach Out */}
        <div className="w-full md:w-1/4">
          <h3 className="font-semibold text-lg mb-2 text-center md:text-left">REACH OUT</h3>
          <ul className="text-gray-700 text-sm space-y-1 text-center md:text-left">
            <li>contact no : 9284195277</li>
            <li>mail : teamskillcypher@gmail.com</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
