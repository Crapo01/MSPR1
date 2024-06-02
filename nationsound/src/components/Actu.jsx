import { useEffect, useState } from "react";
import ReactHtmlParser from 'react-html-parser'; 

function Actu() {
    const [datas, setDatas] = useState(false);
    async function fetchWordPressData() {
        try {
            const response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/actu");
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

    function Evenement() {        
        if (datas) {
            return (
                <ul>
                    {datas.map((item) => (

                        <li key={item.id}>
                            <div> { ReactHtmlParser (item.acf.texteactu) } </div>
                                                         
                        </li>
                    ))}
                </ul>
            )
        } else {
            return <h2>PAS D'ACTU POUR LE MOMENT</h2>
        }
    }

    return (
        <div>
            <h1>Infos et actualités</h1>
            <nav >
                <Evenement/>
            </nav>
        </div>
    );
};

export default Actu;