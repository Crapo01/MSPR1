import { useEffect, useState } from "react";

function Programmation() {
    const [datas, setDatas] = useState([]);
    const [filterDay, setFilterDay] = useState("tout");
    const [filterType, setFilterType] = useState("tout");
    const [filterHour, setFilterHour] = useState("tout");
    const [filterScene, setFilterScene] = useState("tout");

    const filteredEvents = datas.filter
        ((event) =>
            (event.acf.date === filterDay || filterDay === "tout") &&
            (event.acf.type === filterType || filterType === "tout")&&
            (event.acf.heure.slice(0,2) >= filterHour || filterHour === "tout") &&
            (event.acf.scene === filterScene || filterScene === "tout")
        )

    async function fetchWordPressData() {
        try {
            const response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/programmation");
            const data = await response.json();
            console.log(data)
            if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };

        } catch (error) {
            console.log("Une erreur est survenue dans l'appel API: ")
            console.log(error)
        }
    }
    useEffect(() => {
        fetchWordPressData();
    }, []);

    function Evenement() {
        if (datas.length > 0) {
            return (
                <>
                <div>
                    <div>
                        <span className="text-style4">Jour</span>
                        <select onChange={(e) => setFilterDay(e.target.value)} value={filterDay} >
                            <option value={"tout"}>tout</option>
                            <option value={"14 juin"}>14 juin</option>
                            <option value={"15 juin"}>15 juin</option>
                            <option value={"16 juin"}>16 juin</option>
                        </select>
                    </div>
                    <div>
                        <span className="text-style4">Heure</span>
                        <select onChange={(e) => setFilterHour(e.target.value)} value={filterHour} >
                            <option value={"tout"}>tout</option>
                            <option value={"18"}>à partir de 18h</option>
                            <option value={"19"}>à partir de 19h</option>
                            <option value={"20"}>à partir de 20h</option>
                            <option value={"21"}>à partir de 21h</option>
                        </select>
                    </div>
                    <div>
                        <span className="text-style4">Type</span>
                        <select onChange={(e) => setFilterType(e.target.value)} value={filterType} >
                            <option value={"tout"}>tout</option>
                            <option value={"concert"}>seulement les concerts</option>
                            <option value={"rencontre"}>seulement les rencontres</option>                            
                        </select>
                    </div>
                    <div>
                        <span className="text-style4">Scene</span>
                        <select onChange={(e) => setFilterScene(e.target.value)} value={filterScene} >
                            <option value={"tout"}>tout</option>
                            <option value={"principale"}>principale</option>
                            <option value={"nord"}>nord</option> 
                            <option value={"ouest"}>ouest</option>
                            <option value={"sud"}>sud</option> 
                            <option value={"est"}>est</option>                             
                        </select>
                    </div>
                </div>
                    
                    <form action=""></form>
                    <ul>
                        {filteredEvents.map((item) => (

                            <li key={item.id}>
                                <div> {item.acf.nom}</div>
                                <div>le {item.acf.date} à {item.acf.heure}</div>
                                <div>Scène: {item.acf.scene}</div>
                            </li>
                        ))}
                    </ul>
                </>
            )
        } else {
            return <h2>PAS D'EVENEMENT POUR LE MOMENT</h2>
        }
    }

    return (
        <div>
            <h1>Programmation</h1>
            <nav >
                <Evenement />
            </nav>
        </div>
    );
};

export default Programmation;