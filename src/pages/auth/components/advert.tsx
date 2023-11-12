import React from "react";

const Advert = (): JSX.Element => {
  return (
    <main>
      <text className="w-full flex justify-center p-4 text-3xl">
        Welcome to{" "}
        <text className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold">
          Zhoot
        </text>
        !
      </text>
      <div className="mockup-browser border bg-base-300 m-4">
        <div className="mockup-browser-toolbar">
          <div className="input">https://zhoot.apcs</div>
        </div>
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
    </main>
  );
};

export default Advert;
