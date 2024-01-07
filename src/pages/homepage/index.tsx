import React from "react";
import TopBar from "../global_components/topbar";
import Layout from "../global_components/layout";
import PrivateQuizzes from "./components/private_quizzes";
import PublicQuizzes from "./components/public_quizzes";

const Homepage: React.FC = () => {
  return (
    <Layout> 
      <div className="grow flex flex-col w-full p-4 overflow-y-auto">
        <PrivateQuizzes />
        <div className="mt-4">
        <PublicQuizzes />
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
