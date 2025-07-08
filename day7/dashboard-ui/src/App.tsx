import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router';
import Sidebar from "./components/SideBar";
import Header from "./components/Header";
import PatientsPage from "./pages/PatientsPage";
import OverviewPage from "./pages/OverviewPage";
import MapPage from "./pages/MapPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DoctorsPage from "./pages/DoctorsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-white">
          <Outlet /> {/* Điểm render nội dung động */}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PatientsPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;