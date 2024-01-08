import React, { useState, useEffect } from "react";
import Modal from "./profile_modal";

type TopBarProps = {
  name: string;
  set: any;
  show_search: boolean;
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
          <p className="text-white text-sm ml-1">
            {hours < 12 ? "Good morning" : "Good afternoon"}
          </p>
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
          <p className="text-white text-sm ml-1">
            {hours < 12 ? "Good morning" : "Good afternoon"}
          </p>
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
const TopBar: React.FC<TopBarProps> = (props) => {
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const handleUpdateModal = () => {
    if (props.name == "") {
      alert("You must sign in first!");
      return;
    }
    setUpdateModalVisible(true);
  };

  const handleCloseModal = () => {
    setUpdateModalVisible(false);
    if (typeof window !== "undefined") {
      const info = localStorage.getItem("info");
      if (info) {
        const data = JSON.parse(info);
        props.set(data.name);
      }
    }
  };

  return (
    <header className="antialiased w-full">
      {isUpdateModalVisible && <Modal handleCloseModal={handleCloseModal} />}
      <nav className="bg-primary border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 w-full">
        <div className="flex flex-wrap w-full items-center">
          <div className="flex justify-center grow">
            {props.show_search ? (
              <form
                action={`/search-result?keyword=${keyword}`}
                method="POST"
                className="hidden basis-1/2 lg:block justify-center lg:pl-2 items-center"
              >
                <label
                  htmlFor="search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            ) : null}
          </div>

          <div className="flex lg:order-2 flex-row">
            <div className="text-gray-500 text-sm flex flex-col justify-items-end items-end">
              <TimeIcon />
              <button
                className="text-white text-2xl text-right font-bold mt-1 hover:underline cursor-pointer"
                onClick={handleUpdateModal}
              >
                {props.name == "" ? "Guest" : props.name}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopBar;
