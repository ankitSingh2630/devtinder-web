import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import Body from "./Components/Body"
import Feed from "./Components/Feed"
import Connections from "./Components/Connections"
import Requests from "./Components/Requests"


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    
      <BrowserRouter basename="/">
      <Routes>
         <Route path="/login" element={<Login />} />
         {/* Protected Routes */}
        <Route path="/" element={<Body/>} >
          <Route path="/" element={<Feed/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections/>}/>
          <Route path="/requests" element={<Requests/>}/>

        </Route>

      </Routes>
      </BrowserRouter>

    

    </>
  )
}

export default App
