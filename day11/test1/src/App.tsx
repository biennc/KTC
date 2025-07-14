import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./UserProvider";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <div className="container mx-auto py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
