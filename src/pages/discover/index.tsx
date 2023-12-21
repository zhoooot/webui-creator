import Layout from "../global_components/layout";
import QuizCard from "./components/quiz_card";

const Discover: React.FC = () => {
  return (
    <Layout>
      <div className="h-full bg-base-100 px-12 py-6 w-full rounded-2xl flex flex-col">
        <h1 className="text-3xl font-bold pb-4">DISCOVER</h1>
        {/* <button className="btn btn-wide">See more...</button> */}
        <div className="grid grid-cols-3 grid-rows-3 gap-4 grow w-full">
          <QuizCard
            id={1}
            imageUrl="https://th.bing.com/th/id/OIG.gq_uOPPdJc81e_v0XAei"
            number={1}
            name="Quiz Name"
            questionCount={10}
          />
          <QuizCard
            id={2}
            imageUrl="https://th.bing.com/th/id/OIG.gq_uOPPdJc81e_v0XAei"
            number={2}
            name="Quiz Name"
            questionCount={10}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
