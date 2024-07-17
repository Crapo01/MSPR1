import Actu from "../components/Actu";
import Concerts from "../components/Concerts";
import Programmation from "../components/Programmation"
import Shop from "../components/Shop";
import CarteMini from "../components/CarteMini";
import Loader from "../components/LocalDatasLoader";


function Home() {
    return (
        <>
            <Loader/>
            <Actu />
            <Programmation></Programmation>
            <Concerts />
            <Shop/>            
            <CarteMini/>
            
      </>  
    );
};

export default Home;