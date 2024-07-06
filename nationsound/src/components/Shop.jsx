import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Shop() {
    return (

        <Row className={"py-3 my-5 border rounded bg-light "}>
            <h1 className="sectionTitle colorBlue d-flex justify-content-around"><Image src="/images/title4.png" />BOUTIQUE<Image src="/images/title1.png" /></h1>
            <a target="_blank" style={{ textDecoration: "none" }} href="https://nationsoundluc.rf.gd/wpdb/boutique/" className="d-flex justify-content-around hovering">
            <div>
                <img src="/images/entree1jour.png" alt="entree 1 jour" className="img-fluid mx-auto" /> 
                <h2 className="text-center">Acceder à la boutique</h2>
                </div>               
            </a>          
            
        </Row>

    );
};

export default Shop;