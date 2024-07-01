import { useEffect, useState } from "react";
import { Col,Image,Row } from "react-bootstrap";

function Concerts() {
    const [datas, setDatas] = useState(false);
    async function fetchWordPressData() {
        try {
            const response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/concerts");
            const data = await response.json();
            console.log(data)
            if (data.code === "rest_no_route") {throw "error:rest_no_route"} else {setDatas(data)} ;

        } catch (error) {
            console.log("Une erreur est survenue dans l'appel API: ")
            console.log(error)       
        }
    }
    useEffect(() => {
        fetchWordPressData();
    }, []);

    function Groupes() {        
        if (datas) {
            return (
                <Row>
                    {datas.map((item) => (
<Col className="col-12 col-md-6 col-lg-4 p-3 ">
                        <div key={item.id} className={"p-3 border rounded shadow"}>
                            <h2> {item.acf.nom}</h2>
                            <img src={item.acf.photo.link} alt="" style={{width: 100+'%'}} />
                            <p> {item.acf.description}</p>
                            <h3>Origines:</h3>
                             <p>{item.acf.continent}</p>
                            <h3>Programmation:</h3>  <p>le {item.acf.date} à {item.acf.heure}</p>
                            <h3>Scène:</h3> <p>{item.acf.scene}</p>
                        </div>
                    </Col>
                    ))}
                </Row>
            )
        } else {
            return <h2><Image src="/images/loading.gif"/>Pas de concerts pour le moment</h2>
        }
    }
    return (
        
            <div className={"p-3 m-md-5 border rounded bg-light"}>
            <h1 className="sectionTitle colorOrange"><Image src="/images/title3.png"/>CONCERTS</h1>
                <Groupes />
            </div>
        
    );
};

export default Concerts;