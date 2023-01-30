import Content from "../components/Content";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import LoginMethods from "../components/LoginMethods";

import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="bg-[#1E1E1E] w-full h-full overflow-x-hidden overflow-y-hidden flex flex-col">
      <Intro />
      <main className="flex">
        <Sidebar />
        <Content />
        <Footer />
      </main>
    </div>
  );
}
