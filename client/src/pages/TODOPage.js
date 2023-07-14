import TODOListMainView from "../components/TODOList/TODOListMainView";
import SideBar from "../components/SideBar";

const TODOPage = () => {
  return (
    <>
      <div className="fixed left-0 top-0 z-[1035] h-screen">
        <SideBar />
      </div>
      <div className="flex flex-wrap p-5 pl-80">
        <TODOListMainView />
      </div>
    </>
  );
};

export default TODOPage;
