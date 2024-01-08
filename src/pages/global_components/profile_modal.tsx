import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { instituteList } from "@/interface/InstitutionData";
import {
  CREATOR_URL,
  INFO_LOCAL_STORAGE_KEY,
  JWT_LOCAL_STORAGE_KEY,
} from "@/config";
import { ICreatorData } from "@/interface/ICreatorData";
import { decode } from "@/helper/decode_jwt";
import axios from "axios";
import router from "next/router";

interface ModalProps {
  handleCloseModal: () => void;
}

const ProfileModal = (props: ModalProps) => {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const [name, setName] = useState("Name");
  const [institute, setInstitute] = useState("Institute");
  const [phone, setPhone] = useState("09090909");

  const changeInfo = async (props: {name: string, institute: string, phone: string}) => {
    console.log("Changing info");
    const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    if (!jwt) {
      window.location.href = "/auth";
    } else {
      try {
        const decoded = decode(jwt);
        const url = CREATOR_URL + "/creator/" + decoded.sub;
        if (!decoded.sub) {
          throw new Error("User not found");
        }
        const data = {
          fullname: props.name,
          institution: props.institute,
          phone: props.phone,
        };
        console.log("Sending request with data: ", data);
        const response = await axios.put(url, data);
        if (response.status !== 200) {
          throw new Error("Something went wrong");
        }
        console.log("Successfully changed info", response);
        const info: ICreatorData = {
          id: decoded.sub,
          name: props.name,
          phone: props.phone,
          institute: props.institute,
        };
        if (typeof window !== "undefined") {
          localStorage.removeItem(INFO_LOCAL_STORAGE_KEY);
          localStorage.setItem(INFO_LOCAL_STORAGE_KEY, JSON.stringify(info));
        }
      } catch (e: any) {
        alert(e.message);
      }
    }
  };

  useEffect(() => {
    const fetchInfo = async (jwt: string) => {
      const decoded = decode(jwt);
      const url = CREATOR_URL + "/creator/" + decoded.sub;
      console.log(url);
      const response = await axios.get(CREATOR_URL + "/creator/" + decoded.sub);
      const info: ICreatorData = {
        id: response.data.id,
        name: response.data.fullname,
        phone: response.data.phone,
        institute: response.data.institution,
      };
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }
      if (typeof window !== "undefined") {
        localStorage.removeItem(INFO_LOCAL_STORAGE_KEY);
        localStorage.setItem(INFO_LOCAL_STORAGE_KEY, JSON.stringify(info));
      }
    };

    if (typeof window === "undefined") throw new Error("Window is undefined");
    const info = localStorage.getItem(INFO_LOCAL_STORAGE_KEY);
    if (info) {
      const data = JSON.parse(info);
      if (data.name !== undefined && data.name !== null) setName(data.name);
      if (data.institute !== undefined && data.institute !== null)
        setInstitute(data.institute);
      if (data.phone !== undefined && data.phone !== null) setPhone(data.phone);
    } else {
      const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
      if (!jwt) {
        window.location.href = "/auth";
      } else {
        try {
          fetchInfo(jwt);
          const info = localStorage.getItem(INFO_LOCAL_STORAGE_KEY);
          const data = JSON.parse(info!);
          console.log(data.name, data.institute, data.phone);
          if (data.name !== undefined && data.name !== null) setName(data.name);
          if (data.institute !== undefined && data.institute !== null)
            setInstitute(data.institute);
          if (data.phone !== undefined && data.phone !== null)
            setPhone(data.phone);
        } catch (e: any) {
          alert(e.message);
        }
      }
    }
  }, []);

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
                      <form className="mt-8 space-y-6">
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
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
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
                                      value={institute}
                                      onChange={(e) =>
                                        setInstitute(e.target.value)
                                      }
                                    >
                                      {instituteList.map((institute_it) => (
                                        <option
                                          key={institute_it}
                                          value={institute_it}
                                        >
                                          {institute_it}
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
                                      <label
                                        htmlFor="phone-input"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
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
                                          value={phone}
                                          onChange={(e) =>
                                            setPhone(e.target.value)
                                          }
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
                            onClick={async () => {
                              await changeInfo({name, institute, phone});
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
};

export default ProfileModal;
