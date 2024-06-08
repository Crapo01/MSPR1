import { useEffect, useState } from "react";
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
                <h2>INFORMATIONS GENERALES</h2>
                <ul>
                    {datasNormal.map((item) => (                        
                        <li key={item.id}>
                            <div> { ReactHtmlParser (item.acf.texteactu) } </div>                                                         
                        </li>
                    ))}
                </ul>
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
                <h2>ALERTES</h2>
                <ul>
                    {datasPrio.map((item) => (                        
                        <li key={item.id}>
                            <div> { ReactHtmlParser (item.acf.texteactu) } </div>                                                         
                        </li>
                    ))}
                </ul>
                </>
            )
        } else {
            return <h3>PAS D'ALERTES POUR LE MOMENT</h3>
        }
    }

    return (
        <div>
            <h1>INFORMATIONS ET ALERTES</h1>
                <PrioEvent/>
                <NormalEvent/>
            
        </div>
    );
};

export default Actu;