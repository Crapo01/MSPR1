import { Link } from "react-router-dom";

function Shop() {
    return (
        <div>
            <h1>BOUTIQUE</h1>
            <div>
            <img src="/images/entree1jour.png" alt="entree 1 jour" />
            <a target="_blank" style={{textDecoration: "none"}} href="http://localhost/ns_hl_wp/boutique/">Aller à la boutique en ligne</a>
            <img src="/images/entree3jours.png" alt="entree 3 jours" />
            </div>
        </div>
    );
};

export default Shop;