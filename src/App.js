import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import HabitsPage from "./pages/HabitsPage";
import TODOPage from "./pages/TODOPage";
import FlashcardPage from "./pages/FlashcardsPage";
import DashboardPage from "./pages/DashboardPage";
import StatisticsPage from "./pages/StatisticsPage";
import StudyGroupPage from "./pages/StudyGroupsPage";
import TimerPage from "./pages/TimerPage";
import SettingsPage from "./pages/SettingsPage";

import SideBar from "./components/SideBar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="overallAppView">
        <div className="sideBarView">
          <SideBar />
        </div>

        <Routes>
          <Route path={"/dashboard"} element={<DashboardPage />} />
          <Route path={"/profile"} element={<ProfilePage />} />
          <Route path={"/flashcards"} element={<FlashcardPage />} />
          <Route path={"/todos"} element={<TODOPage />} />
          <Route path={"/habits"} element={<HabitsPage />} />
          <Route path={"/timer"} element={<TimerPage />} />
          <Route path={"/statistics"} element={<StatisticsPage />} />
          <Route path={"/studyGroups"} element={<StudyGroupPage />} />
          <Route path={"/settings"} element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
