import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import React from "react";

interface ModalProps {
  title: string;
  description: string;
  visibility: string;
  imageUrl: string;
  handleCloseModal: () => void;
  handleSaveModal: (
    arg0: string,
    arg1: string,
    arg2: string,
    arg3: string
  ) => void;
}

export default function Modal(props: ModalProps) {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const [visibility, setVisibility] = useState(props.visibility);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [imageUrl, setImageUrl] = useState(props.imageUrl);

  return (
    <>
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
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
              <Dialog.Panel className="relative basis-2/4 transform w-50 rounded-xl overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 max-w-full">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
                  <div className="sm:flex sm:items-start  w-full">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold leading-6 text-gray-900"
                      >
                        Quiz Detail
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
                                  Title
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm px-2 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="text"
                                      name="title"
                                      id="title"
                                      autoComplete="title"
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="Enter quiz title"
                                      value={title}
                                      onChange={(e) => setTitle(e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              </fieldset>
                              <fieldset>
                              <div className="col-span-1">
                                <label
                                  htmlFor="description"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Description
                                </label>
                                <div className="mt-2">
                                  <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Enter quiz description"
                                    value={description}
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                              </div>
                              </fieldset>

                              <fieldset>
                                <label
                                  htmlFor="visibility"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Visibility
                                </label>
                                <div className="space-x-6 flex flex-row justify-between">
                                  <div className="flex items-center gap-x-3 flex-1">
                                    <input
                                      id="private"
                                      name="visibility"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      checked={visibility === "private"}
                                      onChange={() => setVisibility("private")}
                                    />
                                    <label
                                      htmlFor="private"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Private
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-x-3 flex-1">
                                    <input
                                      id="public"
                                      name="visibility"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      checked={visibility === "public"}
                                      onChange={() => setVisibility("public")}
                                    />
                                    <label
                                      htmlFor="public"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Public
                                    </label>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                            
                            <div className="flex-1 grow flex flex-col">
                              <label
                                htmlFor="cover-image"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Cover image
                              </label>
                              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-cover grow items-center"
                                style={{ backgroundImage: "url('" + imageUrl + "')" }}
                              >
                                <button type="button" className="flex flex-row gap-1 items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                  onClick={() => {
                                    const randomSeed = Math.floor(Math.random() * 100000) + 1;
                                    setImageUrl(`https://picsum.photos/seed/${randomSeed}/2000/2000`);
                                  }}
                                >
                                  <Icon
                                    icon="ri:dice-fill"
                                    className="mx-auto h-8 w-8 text-white outline-1"
                                  />
                            
                                  <p className="text-xs font-body normal-case leading-5 text-white">
                                    Randomize
                                  </p>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={async () => {
                              const response = window.confirm(
                                "There are unsaved changes. Are you sure you want to discard all?"
                              );
                              if (response) {
                                props.handleCloseModal();
                                setOpen(false);
                              }
                            }}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            onClick={() => {
                              if (title === "" || description === "") {
                                return;
                              }
                              const response = window.confirm(
                                "Save all changes?"
                              );
                              if (response) {
                                props.handleSaveModal(
                                  title,
                                  description,
                                  visibility,
                                  imageUrl
                                );
                                props.handleCloseModal();
                                setOpen(false);
                              }
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
    </>
  );
}
