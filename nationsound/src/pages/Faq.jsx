import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";

function Faq() {
    const [datas, setDatas] = useState([]);
    const [localDatas,setLocalDatas] = useLocalStorage("questions")

    
    async function fetchWordPressData() {
        try {
            const response = await fetch("https://nationsoundluc.rf.gd/wpdb/wp-json/acf/v3/questions");
            // const response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/questions");
            const data = await response.json();
            console.log(data)
            if (data.code === "rest_no_route") { throw "error:rest_no_route" }
            else {
                setDatas(data);
                setLocalDatas(data)
            };

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
    

    

    function Question() {
        if (datas.length > 0) {
            return (
                <>
                    <Row className={"m-3 border rounded bg-secondary justify-content-around"}>
                        <h1 className="colorRed"><Image src="/images/title4.png" />Foire aux questions</h1>
                        {datas.map((item) => (

                            <Col className="col-11 p-3 m-2 bg-light border rounded shadow d-flex flex-column" key={item.id }>

                                <h2 className="text-center "> {item.acf.question}</h2>
                                <p className="text-center h2"> {item.acf.reponse}</p>
                                

                            </Col>
                        ))}
                    </Row>
                </>
            )
        } else return (
            <>
                <Row className={"m-3 border rounded bg-light "}>
                    <h1 className="colorRed"><Image src="/images/title4.png" />Foire aux questions<Image src="/images/loading.gif" width={300 + 'px'} className="p-5 m-5" /></h1>

                </Row>
            </>
        )

    }





    return (
        <div>

            <Question />
        </div>
    );
};

export default Faq;