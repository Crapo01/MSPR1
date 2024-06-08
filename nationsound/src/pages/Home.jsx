import Actu from "../components/Actu";
import Carte from "../components/Carte";
import Concerts from "../components/Concerts";
import Programmation from "../components/Programmation"
function Home() {
    return (
        <div>
            
            <Actu />
            <Programmation></Programmation>
            <Concerts />
            <a target="_blank" style={{textDecoration: "none"}} href="http://localhost/ns_hl_wp/boutique/">
                <div style={{
                    color: "white",
                    backgroundColor: "DarkGray",
                    padding: "10px",
                    fontFamily: "Arial",
                    textAlign: "center",
                    textDecoration: "none"
                }}> BILLETTERIE</div>
            </a>
            <Carte />
        </div>
    );
};

export default Home;