import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Invoices App
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Try It
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <div
          className={`${menuOpen ? "block" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/capture"
                onClick={handleLinkClick}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
              >
                Capture
              </Link>
            </li>
            <li>
              <Link
                to="/checks"
                onClick={handleLinkClick}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
              >
                Checks
              </Link>
            </li>
            <li>
              <Link
                to="/invoices"
                onClick={handleLinkClick}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
              >
                Invoices
              </Link>
            </li>
            <li>
              <Link
                to="/companies"
                onClick={handleLinkClick}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
              >
                Companies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
