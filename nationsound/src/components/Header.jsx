import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div>
            <h1>HEADER</h1>
            <nav >
                <ul >
                    <li ><Link to={"/"}>Accueil </Link> </li>
                    <li > <Link to={"/Map"}>Carte </Link> </li>
                    <li > <Link to={"/Partenaires"}>Partenaires </Link> </li>
                    <li ><a target="_blank"  href="http://localhost/ns_hl_wp/questions/">FAQ</a></li>
                    <li ><a target="_blank"  href="http://localhost/ns_hl_wp/partenaires/">Partenaires</a></li>
                    <li ><a target="_blank"  href="http://localhost/ns_hl_wp/boutique/">Billeterie</a></li>
                    
                </ul>
            </nav>
        </div>
    );
};

export default Header;