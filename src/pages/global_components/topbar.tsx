import React, { useState, useEffect } from "react";

type TopBarProps = {
  name: string;
};

const TimeIcon = (): JSX.Element => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getIcon = (): JSX.Element => {
    const hours = time.getHours();

    if (hours >= 6 && hours < 18) {
      return (
        <div className="flex self-end items-center">
        <svg
          className="w-5 h-5 dark:text-gray-800 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 3V1m0 18v-2M5.05 5.05 3.636 3.636m12.728 12.728L14.95 14.95M3 10H1m18 0h-2M5.05 14.95l-1.414 1.414M16.364 3.636 14.95 5.05M14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
          />
        </svg>
        <p className="text-white text-sm ml-1">{hours < 12 ? "Good morning" : "Good afternoon"}</p>
        </div>

      );
    } else {
      return (
        <div className="flex items-center">
        <svg
          className="w-5 h-5 dard:text-gray-800 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.509 5.75c0-1.493.394-2.96 1.144-4.25h-.081a8.5 8.5 0 1 0 7.356 12.746A8.5 8.5 0 0 1 8.509 5.75Z"
          />
        </svg>
        <p className="text-white text-sm ml-1">Good evening</p>
        </div>
      );
    }
  };

  return <div>{getIcon()}</div>;
};

const TopBar: React.FC<TopBarProps> = (props) => {

  return (
    <header className="antialiased w-full">
      <nav className="bg-primary border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 w-full">
        <div className="flex flex-wrap w-full items-center">
          <div className="flex justify-center grow">
            <form
              action="#"
              method="GET"
              className="hidden lg:block justify-center lg:pl-2 items-center"
            >
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    {" "}
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />{" "}
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Quiz, categories, or friends"
                />
              </div>
            </form>
          </div>
          <div className="flex lg:order-2 flex-row">
            <div className="text-gray-500 text-sm lg:block justify-items-end items-end ">
              <TimeIcon />
              <p className="text-white text-2xl text-right font-bold mt-1">{props.name == null ? "Taylor Swift" : props.name}</p>
            </div>
           
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopBar;
