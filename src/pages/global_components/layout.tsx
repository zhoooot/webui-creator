// components/Layout.tsx
import React, { ReactNode } from 'react';
import VerticalNavigation from './vertical_navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <VerticalNavigation />
      <main className="w-4/5 p-4">{children}</main>
    </div>
  );
};

export default Layout;
