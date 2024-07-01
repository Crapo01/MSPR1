import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Map from "./pages/Map"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Partenaires from "./pages/Partenaires"
import Programme from "./pages/Programme"
import { Container } from "react-bootstrap"
import './App.css'


function App() {
  

  return (
    
      
       <Container >
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/Partenaires" element={<Partenaires />} />
        <Route path="/Programme" element={<Programme />} />        
      </Routes>
      <Footer></Footer>
      </Container> 
    
  )
}

export default App
