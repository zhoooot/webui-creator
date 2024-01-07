import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";

interface ModalProps {
  handleCloseModal: () => void;
}

export default function Modal(props: ModalProps) {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const [name, setName] = useState("Name");
  const [institute, setInstitute] = useState("Institute");
  const [phone, setPhone] = useState("09090909");

  const instituteList = [
    "University of Toronto",
    "University of Waterloo",
    "University of British Columbia",
    "McGill University",
    "University of Alberta",
    "University of Calgary",
    "Western University",
    "Queen's University",
    "University of Ottawa",
    "University of Manitoba",
    "Dalhousie University",
    "Simon Fraser University",
    "University of Victoria",
    "York University",
    "University of Saskatchewan",
    "University of Guelph",
    "Carleton University",
    "University of Regina",
    "University of Windsor",
    "University of Lethbridge",
    "Memorial University of Newfoundland",
    "University of Northern British Columbia",
    "Lakehead University",
    "Ryerson University",
    "Acadia University",
    "University of New Brunswick",
    "University of Prince Edward Island",
    "Brock University",
    "University of Ontario Institute of Technology",
    "Wilfrid Laurier University",
    "University of the Fraser Valley",
    "University of Winnipeg",
    "Mount Allison University",
    "University of Northern British Columbia",
    "Ho Chi Minh City University of Technology",
    "Ho Chi Minh City University of Science",
    "Ho Chi Minh City University of Social Sciences and Humanities",
    "Ho Chi Minh City University of Economics",
    "Ho Chi Minh City University of Law",
    "Ho Chi Minh City University of Foreign Languages and Information Technology",
    "Ho Chi Minh City University of Pedagogy",
    "Ho Chi Minh City University of Architecture",
    "Ho Chi Minh City University of Agriculture and Forestry",
    "Ho Chi Minh City University of Transport",
    "Ho Chi Minh City University of Technical Education",
    "Ho Chi Minh City University of Industry",
  ];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative basis-1/4 transform w-50 rounded-xl overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 max-w-full">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
                  <div className="sm:flex sm:items-start  w-full">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold leading-6 text-gray-900"
                      >
                        User Information
                      </Dialog.Title>
                      <form className="mt-8 space-y-6" action="#" method="POST">
                        <div className="space-y-12 w-full">
                          <div className="mt-10 flex flex-row gap-x-6 gap-y-8 w-full">
                            <div className="flex flex-col gap-y-4 w-full flex-1">
                              <fieldset>
                                <div className="col-span-1">
                                  <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Name
                                  </label>
                                  <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm px-2 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                      <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Type in your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                              <fieldset>
                                <div className="col-span-1">
                                  <div className="col-span-1">
                                    <label
                                      htmlFor="countries"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Select your institute
                                    </label>
                                    <select
                                      id="countries"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                      {instituteList.map((institute) => (
                                        <option key={institute} value={institute}>
                                          {institute}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </fieldset>

                              <fieldset>
                                <div className="col-span-1">
                                  <fieldset>
                                    <div className="col-span-1">
                                      <label htmlFor="phone-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Phone number:
                                      </label>
                                      <div className="relative">
                                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                          <svg
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 19 18"
                                          >
                                            <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                                          </svg>
                                        </div>
                                        <input
                                          type="text"
                                          id="phone-input"
                                          aria-describedby="helper-text-explanation"
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                          placeholder="123-456-7890"
                                          required
                                        />
                                      </div>
                                    </div>
                                  </fieldset>
                                </div>
                              </fieldset>


                            </div>
                          </div>

                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={() => {
                              setOpen(false);
                              props.handleCloseModal();
                            }}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onSubmit={() => {
                              props.handleCloseModal();
                              setOpen(false);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
