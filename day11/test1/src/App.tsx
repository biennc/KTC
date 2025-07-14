import UserList from "./UserList"
import { UserProvider } from "./UserProvider"

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            User List
          </h1>

          {/* User Management with integrated form */}
          <UserList />
        </div>
      </div>
    </UserProvider>
  )
}

export default App
