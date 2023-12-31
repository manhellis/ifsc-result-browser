import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-start">
        <Link href="/" className="hover:text-gray-300 mx-4">
            Home
        </Link>
        <Link href="/page2" className="hover:text-gray-300 mx-4">
            page2
        </Link>
        <Link href="/page3" className="hover:text-gray-300 mx-4">
            page3
        </Link>
        {/* Add more <Link> components for other navigation items */}
      </div>
    </nav>
  );
};

export default Navbar;
