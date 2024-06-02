import { useEffect, useState } from "react";

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
                <ul>
                    {datas.map((item) => (

                        <li key={item.id}>
                            <div> {item.acf.nom}</div>
                            <img src={item.acf.photo.link} alt="" />
                            <div> {item.acf.description}</div>
                            <div>Origines: {item.acf.continent}</div>
                            <div>Programmation: le {item.acf.date} à {item.acf.heure}</div>
                            <div>Scène: {item.acf.scene}</div>
                        </li>
                    ))}
                </ul>
            )
        } else {
            return <h2>PAS DE CONCERTS POUR LE MOMENT</h2>
        }
    }
    return (
        <div>
            <h1>Concerts</h1>
            <nav >
                <Groupes />
            </nav>
        </div>
    );
};

export default Concerts;