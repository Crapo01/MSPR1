import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";

function Partenaires() {
    const [datas, setDatas] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const [technique, setTechnique] = useState([]);
    const [logistique, setLogistique] = useState([]);
    const [alimentation, setAlimentation] = useState([]);

    function sortingPartnersByCategory(category, partner) {
        console.log(category)
        category.map((cat) => {
            switch (cat) {
                case "technique":
                    const tempTech = technique;
                    tempTech.push(partner);
                    setTechnique(tempTech)
                    break;
                case "sponsor":
                    const tempSpon = sponsors;
                    tempSpon.push(partner);
                    setSponsors(tempSpon)
                    break;
                case "logistique":
                    const tempLogi = logistique;
                    tempLogi.push(partner);
                    setLogistique(tempLogi)
                    break;
                case "alimentation":
                    const tempAlim = alimentation;
                    tempAlim.push(partner);
                    setAlimentation(tempAlim)
                    break;
            }
        })
    }

    async function fetchWordPressData() {
        try {
            const response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/partenaires");
            const data = await response.json();
            console.log(data)
            if (data.code === "rest_no_route") { throw "error:rest_no_route" }
            else {
                setDatas(data);
            };

        } catch (error) {
            console.log("Une erreur est survenue dans l'appel API: ")
            console.log(error)
        }
    }
    useEffect(() => {
        fetchWordPressData();
    }, []);

    useEffect(() => {
        datas.map((item) => sortingPartnersByCategory(item.acf.type, item));
        console.log("sponsors in use effect");
        console.log(sponsors);
    }, [datas]);

    function Sponsors() {
        if (sponsors.length > 0) {
            return (
                <>
                    <Image src="/images/Partners1.png" />
                    <Row className={"m-3 border rounded bg-light justify-content-around"}>
                        {sponsors.map((item) => (

                            <Col className="col-12 col-md-6 col-lg-4 p-3 m-2 border rounded shadow" key={item.id + 100}>
                                
                                    <div> {item.acf.nom}</div>
                                    <img src={item.acf.logo.link} alt="" />
                                
                            </Col>
                        ))}
                    </Row>
                </>
            )
        }
    }

    function Technique() {
        if (technique.length > 0) {
            return (
                <>
                    <Image src="/images/Tech.png" />
                    <Row className={"m-3 border rounded bg-light justify-content-around"}>
                        {technique.map((item) => (

                            <Col className="col-12 col-md-6 col-lg-4 p-3 m-2 border rounded shadow" key={item.id + 1000}>
                                
                                    <div> {item.acf.nom}</div>
                                    <img src={item.acf.logo.link} alt="" />
                                
                            </Col>
                        ))}
                    </Row>
                </>
            )
        }

    }

    function Logistique() {
        if (logistique.length > 0) {
            return (
                <>
                    <Image src="/images/Logi.png" />
                    <Row className={"m-3 border rounded bg-light justify-content-around"}>
                        {logistique.map((item) => (

                            <Col className="col-12 col-md-6 col-lg-4 p-3 m-2 border rounded shadow" key={item.id + 100}>
                                
                                    <div> {item.acf.nom}</div>
                                    <img src={item.acf.logo.link} alt="" />
                                
                            </Col>
                        ))}
                    </Row>
                </>
            )
        }

    }

    function Alimentation() {
        if (alimentation.length > 0) {
            return (
                <>
                    <Image src="/images/Alim.png" />
                    <Row className={"m-3 border rounded bg-light justify-content-around"}>
                        {alimentation.map((item) => (

                            <Col className="col-12 col-md-6 col-lg-4 p-3 m-2 border rounded shadow" key={item.id + 100}>
                                
                                    <div> {item.acf.nom}</div>
                                    <img src={item.acf.logo.link} alt="" />
                                
                            </Col>
                        ))}
                    </Row>
                </>
            )
        }

    }


    // TODO SELECTEUR DE CATEGORIES *******************************************************************


    return (
        <div>
            
            <nav >
                <Sponsors />
                <Technique />
                <Logistique />
                <Alimentation />

            </nav>
        </div>
    );
};

export default Partenaires;