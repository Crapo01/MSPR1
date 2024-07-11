import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";

function Programmation() {
    const [localDatas,setLocalDatas] = useLocalStorage("programmation")
    const [datas, setDatas] = useState([]);
    const [filterDay, setFilterDay] = useState("tout");
    const [filterType, setFilterType] = useState("tout");
    const [filterHour, setFilterHour] = useState("tout");
    const [filterScene, setFilterScene] = useState("tout");

    const filteredEvents = datas.filter
        ((event) =>
            (event.acf.date === filterDay || filterDay === "tout") &&
            (event.acf.type === filterType || filterType === "tout") &&
            (event.acf.heure.slice(0, 2) >= filterHour || filterHour === "tout") &&
            (event.acf.scene === filterScene || filterScene === "tout")
        )

    async function fetchWordPressData() {
        try {
            const response = await fetch("https://nationsoundluc.rf.gd/wpdb/wp-json/acf/v3/programmation");
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

    function Evenement() {
        if (datas.length > 0) {
            return (
                <>

                    <Row >
                        <Col className="flex-column col-12 col-md-4">
                            <Col>
                                <div className="text-style4">Jour</div>
                                <select onChange={(e) => setFilterDay(e.target.value)} value={filterDay} style={{ width: 150 + 'px' }}>
                                    <option value={"tout"}>tout</option>
                                    <option value={"14 juin"}>14 juin</option>
                                    <option value={"15 juin"}>15 juin</option>
                                    <option value={"16 juin"}>16 juin</option>
                                </select>
                            </Col>
                            <Col>
                                <div className="text-style4">Heure</div>
                                <select onChange={(e) => setFilterHour(e.target.value)} value={filterHour} style={{ width: 150 + 'px' }}>
                                    <option value={"tout"}>tout</option>
                                    <option value={"18"}>à partir de 18h</option>
                                    <option value={"19"}>à partir de 19h</option>
                                    <option value={"20"}>à partir de 20h</option>
                                    <option value={"21"}>à partir de 21h</option>
                                </select>
                            </Col>
                            <Col>
                                <div className="text-style4">Type</div>
                                <select onChange={(e) => setFilterType(e.target.value)} value={filterType} style={{ width: 150 + 'px' }}>
                                    <option value={"tout"}>tout</option>
                                    <option value={"concert"}>les concerts</option>
                                    <option value={"rencontre"}>les rencontres</option>
                                </select>
                            </Col>
                            <Col>
                                <div className="text-style4">Scene</div>
                                <select onChange={(e) => setFilterScene(e.target.value)} value={filterScene} style={{ width: 150 + 'px' }}>
                                    <option value={"tout"}>tout</option>
                                    <option value={"principale"}>principale</option>
                                    <option value={"nord"}>nord</option>
                                    <option value={"ouest"}>ouest</option>
                                    <option value={"sud"}>sud</option>
                                    <option value={"est"}>est</option>
                                </select>
                            </Col>
                        </Col>
                        <Col >
                            <Row className="justify-content-evenly">

                            {filteredEvents.map((item) => (

                                <Col  className="col-md-6 col-lg-4" key={item.id} >
                                    <div className={"m-3"}>
                                    <div className={"p-2 border border-success rounded card shadow"} >
                                        <h2 className="card-title"> {item.acf.nom}</h2>
                                        <div>le {item.acf.date} à {item.acf.heure}</div>
                                        <div>Scène: {item.acf.scene}</div>
                                    </div>
                                    </div>
                                </Col>
                            ))}
                            </Row>
                        </Col>
                    </Row>


                </>
            )
        } else {
            return <h2><Image src="/images/loading.gif"/>Pas d'evenements pour le moment</h2>
        }
    }

    return (
        
            <div className={"p-3 my-5 border rounded bg-light"}>
            <h1 className="sectionTitle colorPurple"><Image src="/images/title2.png"/>PROGRAMMATION</h1>
                <Evenement />
            </div>
        
    );
};

export default Programmation;