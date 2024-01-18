import { Icon } from "@iconify/react";
import { useState } from "react";

const QuizImage = ({ src }: { src: string }) => {
  return <img src={src} alt="" className="w-64 h-64 object-fit object-center" />;
};

const QuizTitle = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-3xl font-bold mb-4 flex-none">{children}</h1>;
};

const QuizAuthor = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-gray-500"> by <span className="text-black font-semibold">{children}</span></p>;
};

const QuizCreatedDate = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-gray-500">{children}</p>;
};

const QuizPublishedIcon = ({ published }: { published: boolean }) => {
  return (
    <Icon
      icon={published ? "majesticons:globe-earth-line" : "majesticons:user-line"}
      className={`w-6 h-6 text-gray-500`}
    />
  );
};

export { QuizImage, QuizTitle, QuizAuthor, QuizCreatedDate, QuizPublishedIcon };