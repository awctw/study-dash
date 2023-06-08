import Pomodoro from "./components/Timer/Pomodoro";
import SideBar from "./components/SideBar";
import TODOListMainView from "./components/TODOList/TODOListMainView";

function App() {
  return (
    <div className="flex justify-between">
      <div className="w-1/4">
        <SideBar />
      </div>
      <div className="flex">
        <TODOListMainView />
      </div>
      <div className="flex-1 flex justify-end mx-4">
        <Pomodoro />
      </div>
    </div>
  );
}

export default App;
