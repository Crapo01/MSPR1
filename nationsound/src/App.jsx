import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Map from "./pages/Map"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Partenaires from "./pages/Partenaires"
import Programme from "./pages/Programme"
import Details from "./pages/Details"
import { Container } from "react-bootstrap"
import './App.css'
import { ConcertContext } from "./components/context"
import { useState } from "react"


function App() {
  const [groupe,setGroupe]= useState();
  
  return (    
    <ConcertContext.Provider value={{
      updateGroupe: (newGroupe)=>setGroupe(newGroupe),
      groupe: groupe
      }}>
       <Container >
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/Partenaires" element={<Partenaires />} />
        <Route path="/Programme" element={<Programme />} />
        <Route path="/Details" element={<Details />} />        
      </Routes>
      <Footer></Footer>
      </Container> 
    </ConcertContext.Provider>
  )
}

export default App
