import { Link } from "react-router-dom";
import Actu from "../components/Actu";
import Carte from "../components/Carte";
import Concerts from "../components/Concerts";
import Programmation from "../components/Programmation"
import Shop from "../components/Shop";

function Home() {
    return (
        <div>
            
            <Actu />
            <Programmation></Programmation>
            <Concerts />
            <Shop/>
            <Link to={"/Map"}>
            <Carte h={"50vh"} w={"50%"}/>
            </Link>
        </div>
    );
};

export default Home;