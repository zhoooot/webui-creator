// components/VerticalNavigation.tsx
import Link from 'next/link';
import React from 'react';

const VerticalNavigation: React.FC = () => {
  return (
    <nav className="w-1/5 bg-gray-800 text-white h-screen">
      <ul className="p-4">
        <li className="mb-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          
        </li>
        <li className="mb-4">
          <Link href="/" className="hover:text-gray-300">
            Discovery
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/" className="hover:text-gray-300">
           Reports
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/my-library/home" className="hover:text-gray-300">
            Library
          </Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default VerticalNavigation;
