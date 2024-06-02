import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Map from "./pages/Map"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Partenaires from "./pages/Partenaires"



function App() {
  

  return (
    <>
      
        
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/Partenaires" element={<Partenaires />} />        
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
