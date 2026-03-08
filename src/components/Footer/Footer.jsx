import { RiStickyNoteAddFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-neutral-primary-soft rounded-base shadow-xs border-t border-default ">
      <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <div className="p-2 bg-gray-200 rounded-lg dark:bg-gray-800">
              <RiStickyNoteAddFill />
            </div>
            <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">
              Note Route
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
            <li>
              <Link to="/about" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/licensing" className="hover:underline me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-default sm:mx-auto lg:my-8" />
        <span className="block text-sm text-body sm:text-center">
          {new Date().getFullYear()}{' '}
          <Link to="/" className="hover:underline font-bold">
            Note Route
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
