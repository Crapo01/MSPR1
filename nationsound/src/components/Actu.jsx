import { useEffect, useState } from "react";
import { Col,Image,Row } from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser'; 

function Actu() {
    const [datasNormal, setDatasNormal] = useState(false);
    const [datasPrio, setDatasPrio] = useState(false);
    
    async function fetchWordPressData() {
        try {
            const response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/actu");
            const data = await response.json();
            console.log(data)
            if (data.code === "rest_no_route") {throw "error:rest_no_route"} else {sortDatas(data)} ;

        } catch (error) {
            console.log("Une erreur est survenue dans l'appel API: ")
            console.log(error)       
        }
    }
    useEffect(() => {
        fetchWordPressData();
    }, []);

    function sortDatas(data) {
        const normalTemp=new Array;
        const prioTemp=new Array;
        data.map((item) => (
            
            item.acf.importance==="prioritaire"? prioTemp.unshift(item):normalTemp.push(item)
        ))
        setDatasNormal(normalTemp);
        setDatasPrio(prioTemp);
    }

    function NormalEvent() {        
        if (datasNormal) {
            return (
                <>
                
                <Row>
                
                    {datasNormal.map((item) => (                        
                        <Col key={item.id} className={"p-3 col-12 col-lg-6"} >
                            <div className={"p-3 border rounded shadow border-primary"}> { ReactHtmlParser (item.acf.texteactu)}  </div>                                                         
                        </Col>
                    ))}
                </Row>
                </>
            )
        } else {
            return <h3>PAS D'INFOS POUR LE MOMENT</h3>
        }
    }
    function PrioEvent() {        
        if (datasPrio) {
            return (
                <>
                
                <Row >
                
                    {datasPrio.map((item) => (                        
                        <Col key={item.id} className={"p-3 col-12 col-lg-6"} >
                            <div className={"p-3 border rounded shadow border-danger"}> { ReactHtmlParser (item.acf.texteactu)}  </div>                                                         
                        </Col>
                    ))}
                </Row>                
                </>
            )
        } else {
            return <h3>PAS D'ALERTES POUR LE MOMENT</h3>
        }
    }

    return (
        <div>
            
            <h1 className="sectionTitle colorGreen"><Image src="/images/titleIcon.png"/>INFOS</h1>
            <div className={"p-3 m-3 border rounded bg-light"}>
            
                <PrioEvent/>
                <NormalEvent/>
            </div>
        </div>
    );
};

export default Actu;