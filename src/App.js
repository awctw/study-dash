import SideBar from "./components/SideBar";
import TODOListMainView from "./components/TODOList/TODOListMainView";
import "./App.css";

function App() {
    return (
        <div className="overallAppView">
            <div className="sideBarView">
                <SideBar />
            </div>
            <div className="dashBoardView">
                <TODOListMainView/>
            </div>
        </div>
    );
}

export default App;
