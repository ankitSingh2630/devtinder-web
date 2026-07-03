import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import Body from "./Components/Body"
import Feed from "./Components/Feed"
import Connections from "./Components/Connections"


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>} >
          <Route path="/" element={<Feed/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections/>}/>

        </Route>

      </Routes>
      </BrowserRouter>

      {/* <Navbar/>
       <h1 class="text-3xl font-bold ">
        Hello world!
      </h1> */}

    </>
  )
}

export default App
