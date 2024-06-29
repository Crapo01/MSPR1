import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Shop() {
    return (
        <div >
<h1 className="sectionTitle colorBlue"><Image src="/images/titleIcon.png"/>BOUTIQUE</h1>
            <Row  className={"p-3 m-3 border rounded bg-light justify-content-around"}>
                <Col className="d-flex justify-content-center col-12 col-md-3">
                    <img src="/images/entree1jour.png" alt="entree 1 jour" width={"150px"} className="shadow"/>
                </Col>
                <Col className=" m-2 d-flex justify-content-center h-50 col-12 col-md-4">
                    <Button className="align-middle" target="_blank" style={{ textDecoration: "none" }} href="http://localhost/ns_hl_wp/boutique/">Aller à la boutique en ligne</Button>
                </Col>
                <Col className="d-flex justify-content-center col-12 col-md-3">
                    <img src="/images/entree3jours.png" alt="entree 3 jours" width={"150px"} shadow/>
                </Col>
            </Row>
        </div>
    );
};

export default Shop;