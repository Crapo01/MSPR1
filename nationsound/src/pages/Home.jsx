import { Link } from "react-router-dom";
import Actu from "../components/Actu";
import Carte from "../components/Carte";
import Concerts from "../components/Concerts";
import Programmation from "../components/Programmation"
import Shop from "../components/Shop";
import CarteMini from "../components/CarteMini";


function Home() {
    return (
        <>
            
            <Actu />
            <Programmation></Programmation>
            <Concerts />
            <Shop/>            
            <CarteMini/>
            
      </>  
    );
};

export default Home;