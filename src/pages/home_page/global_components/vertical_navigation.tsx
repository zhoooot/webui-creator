// components/VerticalNavigation.tsx
import Link from 'next/link';
import React from 'react';

const VerticalNavigation: React.FC = () => {
  return (
    <nav className="w-1/5 bg-gray-800 text-white h-screen">
      <ul className="p-4">
        <li className="mb-4">
          <Link href="/">
            <a className="hover:text-gray-300">Home</a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/my-library/draft">
            <a className="hover:text-gray-300">About</a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/">
            <a className="hover:text-gray-300">Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default VerticalNavigation;
