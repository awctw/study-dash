import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import FlashCardModal from "./components/flashcard/dialogContainer";
import ProfilePage from "./pages/ProfilePage";
import HabitsPage from "./pages/HabitsPage";
import TODOPage from "./pages/TODOPage";
import FlashcardPage from "./pages/FlashcardsPage";
import DashboardPage from "./pages/DashboardPage";
import StatisticsPage from "./pages/StatisticsPage";
import StudyGroupPage from "./pages/StudyGroupsPage";
import TimerPage from "./pages/TimerPage";

import SideBar from "./components/SideBar";

// Referenced Tailwind Elements Example for styling: https://tailwind-elements.com/docs/standard/navigation/sidenav/
function App() {
  return (
    <Router>
      <div className="">
        <div className="fixed left-0 top-0 z-[1035] h-screen">
          <SideBar />
        </div>
        <div className="p-5 !pl-[300px]">
          <Routes>
            <Route path={"/dashboard"} element={<DashboardPage />} />
            <Route path={"/profile"} element={<ProfilePage />} />
            <Route path={"/flashcards"} element={<FlashCardModal />} />
            <Route path={"/todos"} element={<TODOPage />} />
            <Route path={"/habits"} element={<HabitsPage />} />
            <Route path={"/timer"} element={<TimerPage />} />
            <Route path={"/statistics"} element={<StatisticsPage />} />
            <Route path={"/studyGroups"} element={<StudyGroupPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
