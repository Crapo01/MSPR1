import { Link } from "react-router-dom";

function Footer() {
    return (
        <div>
            <h1>Footer</h1>
            <nav >
                <ul >
                <li > <Link to={"/Partenaires"}>Partenaires </Link> </li>
                    
                    <li ><a target="_blank"  href="http://live-events-festival.rf.gd/?page_id=48">FAQ</a></li>
                </ul>
            </nav>
            <nav >
                <ul >
                    <li ><a target="_blank" href="https://x.com/?lang=fr">twitter</a></li>
                    
                    <li ><a target="_blank"  href="https://www.facebook.com/?locale=fr_FR">FB</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Footer;