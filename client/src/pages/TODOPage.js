import SideBar from "../components/SideBar";
import { Typography } from "@material-tailwind/react";
import TODOListModule from "../components/TODOList/TODOListModule";

const TODOPage = () => {
  return (
    <>
      <div className="fixed left-0 top-0 z-[1035] h-screen">
        <SideBar />
      </div>
      <div className="flex flex-wrap p-5 pl-80 flex-col">
        <div className="mx-3">
          <Typography variant="h2">Your Todos</Typography>
        </div>
        <div>
          <TODOListModule />
        </div>
      </div>
    </>
  );
};

export default TODOPage;
