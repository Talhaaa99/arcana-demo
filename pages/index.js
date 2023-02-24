import Content from "../components/Content";
import Intro from "../components/Intro";

export default function Home() {
  return (
    <div className="bg-[#1E1E1E] absolute ml-[240px] w-full h-screen overflow-x-hidden overflow-y-hidden flex flex-col">
      <Intro />
      <main className="flex">
        <Content />
      </main>
    </div>
  );
}
