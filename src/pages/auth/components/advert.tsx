import React from "react";

const Advert = (): JSX.Element => {
  return (
    <main>
      <text className="w-full flex justify-center p-4 text-3xl">
        Welcome to&nbsp;
        <text className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold">
          Zhoot
        </text>
        !
      </text>
      <figure className=" max-w-full h-auto rounded-b-lg shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)]">
        <div className="relative flex items-center bg-gray-800 rounded-t-lg py-2 px-24 dark:bg-gray-700">
          <div className="flex space-x-1 absolute top-2/4 start-4 -translate-y-1">
            <span className="w-2 h-2 bg-red-600 rounded-full dark:bg-red-600"></span>
            <span className="w-2 h-2 bg-yellow-300 rounded-full hover:bg-yellow-300"></span>
            <span className="w-2 h-2 bg-green-500 rounded-full dark:bg-green-500"></span>
          </div>
          <div className="flex justify-center items-center w-full h-full bg-gray-700 text-[.25rem] text-gray-400 rounded-sm sm:text-[.5rem] dark:bg-gray-600 dark:text-gray-400">
            https://www.zhoot.apcs/
          </div>
        </div>

        <div className="bg-gray-800 rounded-b-lg">
          <div className="">
            <iframe
              src="https://www.youtube.com/embed/7XzfWHdDS9Q?si=V_WkdXhX0idMFLWB"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              className="w-full h-[700px]"
            />
          </div>
        </div>
      </figure>
    </main>
  );
};

export default Advert;
