import "./App.css";
import Pomodoro from "./components/Timer/Pomodoro";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SideBar />
      </div>
      <div className="flex-1 flex justify-end mx-4">
        <Pomodoro />
      </div>
    </div>
  );
}

export default App;
