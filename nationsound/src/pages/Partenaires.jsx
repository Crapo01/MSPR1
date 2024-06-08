import { useEffect, useState } from "react";

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
                    <h2>SPONSORS</h2>
                    <ul>
                        {sponsors.map((item) => (

                            <li key={item.id + 100}>
                                <div> {item.acf.nom}</div>
                                <img src={item.acf.logo.link} alt="" />
                            </li>
                        ))}
                    </ul>
                </>
            )
        }
    }

    function Technique() {
        if (technique.length > 0) {
            return (
                <>
                    <h2>TECHNIQUE</h2>
                    <ul>

                        {technique.map((item) => (

                            <li key={item.id + 1000}>
                                <div> {item.acf.nom}</div>
                                <img src={item.acf.logo.link} alt="" />
                            </li>
                        ))}
                    </ul>
                </>
            )
        }

    }

    function Logistique() {
        if (logistique.length > 0) {
            return (
                <>
                    <h2>LOGISTIQUE</h2>
                    <ul>

                        {logistique.map((item) => (

                            <li key={item.id + 10000}>
                                <div> {item.acf.nom}</div>
                                <img src={item.acf.logo.link} alt="" />
                            </li>
                        ))}
                    </ul>
                </>
            )
        }

    }

    function Alimentation() {
        if (alimentation.length > 0) {
            return (
                <>
                    <h2>ALIMENTATION</h2>
                    <ul>

                        {alimentation.map((item) => (

                            <li key={item.id + 100000}>
                                <div> {item.acf.nom}</div>
                                <img src={item.acf.logo.link} alt="" />
                            </li>
                        ))}
                    </ul>
                </>
            )
        }

    }


    // TODO SELECTEUR DE CATEGORIES *******************************************************************


    return (
        <div>
            <h1>PARTENAIRES</h1>
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