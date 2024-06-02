import { useEffect, useState } from "react";

function Partenaires() {
    const [datas, setDatas] = useState(false);
    async function fetchWordPressData() {
        try {
            const response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/partenaires");
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
                            <img src={item.acf.logo.link} alt="" />                            
                        </li>
                    ))}
                </ul>
            )
        } else {
            return <h2>PAS DE PARTENAIRES POUR LE MOMENT</h2>
        }
    }
    return (
        <div>
            <h1>Partenaires</h1>
            <nav >
                <Groupes />
            </nav>
        </div>
    );
};

export default Partenaires;