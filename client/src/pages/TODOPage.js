import TODOListMainView from "../components/TODOList/TODOListMainView";
import SideBar from "../components/SideBar";

const TODOPage = () => {
  return (
    <div>
      <div className="fixed left-0 top-0 z-[1035] h-screen">
        <SideBar />
      </div>
      <div className="p-5 !pl-[300px]">
        <div className="mx-10">
          <TODOListMainView />
        </div>
      </div>
    </div>
  );
};

export default TODOPage;
