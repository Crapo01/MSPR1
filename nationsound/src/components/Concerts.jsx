import { useContext, useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ConcertContext } from "../components/context"
import useLocalStorage from "../hooks/useLocalStorage";
function Concerts() {
    const groupe = useContext(ConcertContext);
    const [localDatas,setLocalDatas] = useLocalStorage("concerts")
    const [datas, setDatas] = useState(false);
    async function fetchWordPressData() {
        try {
            const response = await fetch("https://nationsoundluc.rf.gd/wpdb/wp-json/acf/v3/concerts");
            // const response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/concerts");
            const data = await response.json();
            console.log(data)
            if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data);setLocalDatas(data) };

        } catch (error) {
            console.log("Une erreur est survenue dans l'appel API: ")
            console.log(error)
        }
    }
    useEffect(() => {
        console.log(localDatas);
        if (localDatas) {console.log("uselocalstorage");setDatas(localDatas)}
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
                                <img src={item.acf.photo.link} alt="" style={{ width: 100 + '%' }} />
                                <div>le {item.acf.date} à {item.acf.heure}</div>
                                        <div>Scène: {item.acf.scene}</div>                                                               
                                <Link to={"/Details"} style={{ textDecoration: 'none' }} >
                                    <Button className='btn-dark m-4'
                                        onClick={() => (groupe.updateGroupe({ 
                                            nom: item.acf.nom,
                                            image: item.acf.photo.link,
                                            description: item.acf.description,
                                            origine: item.acf.continent,
                                            programmation: {date: item.acf.date,heure: item.acf.heure},
                                            scene: item.acf.scene
                                            }))}>
                                        plus de details...
                                    </Button>
                                </Link>

                            </div>
                        </Col>
                    ))}
                </Row>
            )
        } else {
            return <h2><Image src="/images/loading.gif" />Pas de concerts pour le moment</h2>
        }
    }
    return (

        <div className={"p-3 m-md-5 border rounded bg-light"}>
            <h1 className="sectionTitle colorOrange"><Image src="/images/title3.png" />CONCERTS</h1>
            <Groupes />
        </div>

    );
};

export default Concerts;