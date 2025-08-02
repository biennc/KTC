import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import SideBar from './components/SideBar'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideBar />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
