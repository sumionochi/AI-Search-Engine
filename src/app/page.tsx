import dynamic from "next/dynamic";

const Home = dynamic(() => import("../components/MainPage"), { ssr: false });

const IndexPage: React.FC = () => {
  return <div className="">
          <Home/>
        </div>;
};

export default IndexPage;
