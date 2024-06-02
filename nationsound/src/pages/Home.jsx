import Actu from "../components/Actu";
import Carte from "../components/Carte";
import Concerts from "../components/Concerts";
import Programmation from "../components/Programmation"
function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Actu/>
            <Programmation></Programmation>
            <Concerts/>
            <Carte/>
        </div>
    );
};

export default Home;