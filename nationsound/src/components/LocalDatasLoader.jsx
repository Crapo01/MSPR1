import { useEffect } from "react"; 
import useLocalStorage from "../hooks/useLocalStorage";

function Loader() {
    const [localDatas,setLocalDatas] = useLocalStorage("questions")    
    
    async function fetchWordPressData() {
        try {
            const response = await fetch("https://nationsoundluc.rf.gd/wpdb/wp-json/acf/v3/questions");
            // const response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/questions");
            const data = await response.json();
            console.log(data)
            if (data.code === "rest_no_route") {throw "error:rest_no_route"} else {setLocalDatas(data);console.log("loader as set localstorage")} ;          
                
        }catch (error) {
            console.log("Une erreur est survenue dans l'appel API actu: ")
            console.log(error)       
        }
    }
    useEffect(() => {
        fetchWordPressData();
    }, []);

}

export default Loader;