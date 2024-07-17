
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";


function CarteMini() {
  
  const [localDatas,setLocalDatas] = useLocalStorage("pointeurs")
  const [datas, setDatas] = useState([]);
  async function fetchWordPressData() {
    try {
        const response = await fetch("https://nationsoundluc.rf.gd/wpdb/wp-json/acf/v3/pointeur");
        // const response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/pointeur");
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
  
  return (
    <>
    <Row className="justify-content-center my-5 mx-md-5 p-5 border rounded bg-light">
    <h1 className="sectionTitle colorRed d-flex justify-content-around"><Image src="/images/title1.png"/>CARTE<Image src="/images/title3.png"/></h1>
    <Link to={"/Map"}> 
    <MapContainer  style={{ height: '300px', width: '100%'}} center={[48.8382 ,2.4427]} zoom={15} scrollWheelZoom={false} locate={{setView: true, maxZoom: 16}}>
    
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      
      if ({datas.lenght > 0}) {

<ul>
  {datas.map((item) => (

    <li key={item.id}>

      {<Marker position={[item.acf.lat, item.acf.lon]} >
        <Tooltip>{item.acf.nom} </Tooltip>        
      </Marker>}
    </li>
  ))}
</ul>
}  
         
    </MapContainer>
    </Link>
    </Row>
    </>

  );
};

export default CarteMini;