import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
    return (
        
            <Row className="bg-dark justify-content-around align-items-center border rounded m-1" style={{height: 150+'px'}}>
            <Col className="d-flex justify-content-center"><a target="_blank" href="https://x.com/?lang=fr"><img src="/images/x.jpg" alt="x" width={50+'px'} className="border rounded" /></a></Col>
            <Col className="d-flex justify-content-center"><a target="_blank"  href="https://www.facebook.com/?locale=fr_FR"><img src="/images/fb.png" alt="fb" width={50+'px'} className="border rounded" /></a></Col>
            <Col className="d-flex justify-content-center"><a target="_blank"  href="https://www.instagram.com/?locale=fr_FR"><img src="/images/ins.jpg" alt="insta" width={50+'px'} className="border rounded" /></a></Col>
            <Col className="d-flex justify-content-center"><a target="_blank"  href="https://www.linkedin.com/?locale=fr_FR"><img src="/images/lin.png" alt="linkedin" width={50+'px'} className="border rounded" /></a></Col>
            <Col className="d-flex justify-content-center"><a target="_blank"  href="https://www.snapchat.com/?locale=fr_FR"><img src="/images/snap.png" alt="snapchat" width={50+'px'} className="border rounded" /></a></Col>
            <Col className="col-12 d-flex justify-content-center"> <Link to={"/MEntions"} style={{ textDecoration: 'none' }}>Mentions légales</Link></Col>
            
            </Row>            
       
    );
};

export default Footer;