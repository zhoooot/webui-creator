import React from 'react';

interface NavBarProps {
    setQuizTitle: React.Dispatch<React.SetStateAction<string>>;
    handleUpdateModal: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
    setQuizTitle,
    handleUpdateModal,
}) => {

    return (
        <header className="h-fit">
            <nav className="bg-white grid grid-cols-12 gap-x-5 px-6 border-gray-200 py-2.5 dark:bg-gray-800">
                <div className="col-span-4 gap-x-5 flex flex-row">
                    <a href="https://flowbite.com" className="">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-6 sm:h-9"
                            alt="Flowbite Logo"
                        />
                    </a>
                    <form className="flex items-center flex-1">
                        <label htmlFor="simple-search" className="sr-only">
                            Quiz Title
                        </label>
                        <div className="relative w-full col-span-3">
                            <input
                                type="text"
                                id="simple-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-4 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter quiz title"
                                required
                                onChange={(e) => setQuizTitle(e.target.value)}
                            />
                        </div>
                    </form>

                    <button
                        type="button"
                        id="createProductModalButton"
                        data-modal-target="createProductModal"
                        data-modal-toggle="createProductModal"
                        onClick={handleUpdateModal}
                        className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                        Setting
                    </button>
                </div>
                <div className="items-center order-2 col-end-13 col-span-2 grid grid-cols-2 gap-x-5">
                    <a
                        href="#"
                        className="flex justify-center text-primary-700 bg-gray-50 dark:text-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    >
                        Exit
                    </a>
                    <a
                        href="#"
                        className="flex justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                        Save
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;