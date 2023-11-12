// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between p-4 bg-gray-800 text-white">
            <input
            type="text"
            placeholder="Search..."
          
            className=" flex-grow border border-white rounded items-start"
          />
         <div className="flex items-end ml-4">
           
            <div className="ml-2">
              <h5>Good morning</h5>
              <h6>Pham Vo Quynh Nhu</h6>
            </div>
            <img
              src="path/to/your/avatar.jpg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full ml-4"
            />
          </div>
      
        {/* Additional header content can go here */}
      </header>
      
    );
};

export default Header;
