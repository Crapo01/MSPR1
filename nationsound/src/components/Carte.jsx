import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import * as L from "leaflet";
import RoutineMachine from "../components/RoutineMachine";


function Carte(props) {
  //  Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {}
  });

  const blueIcon = new LeafIcon({
    iconUrl:
      "./blue.png"
  }),
    greenIcon = new LeafIcon({
      iconUrl:
        "./green.png"
    }),
    orangeIcon = new LeafIcon({
      iconUrl:
        "./orange.png"
    }),
    redIcon = new LeafIcon({
      iconUrl:
        "./red.png"
    });


  function selectColor(type) {
    switch (type) {
      case "scene":
        return (blueIcon)

      case "informations":
        return (redIcon)

      case "toilettes":
        return (orangeIcon)

      case "alimentation":
        return (greenIcon)

    }

  }
  const [datas, setDatas] = useState([]);
  
    const [filter, setFilter] = useState("tout");
    const filteredMarkers = datas.filter
        ((event) =>
            (event.acf.type === filter || filter === "tout")            
        )

  async function fetchWordPressData() {
    try {
      const response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/pointeur");
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


  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        console.log("ma position:"+e.latlng)
        
        
        
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={redIcon}>
        <Popup>
          You are here. <br />
          Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]}
        </Popup>
      </Marker>
    );
  }
  
  return (
    <>
<div>
        <span className="text-style4">Jour</span>
        <select onChange={(e) => setFilter(e.target.value)} value={filter} >
            <option value={"tout"}>tout</option>
            <option value={"scene"}>scenes</option>
            <option value={"informations"}>informations</option>
            <option value={"toilettes"}>toilettes</option>
            <option value={"alimentation"}>alimentation</option>
        </select>
    </div>  
    <MapContainer style={{ height: props.h, width: props.w }} center={[48.8318, 2.414]} zoom={15} scrollWheelZoom={false} locate={{setView: true, maxZoom: 16}}>
    
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      if ({filteredMarkers.lenght > 0}) {

        <ul>
          {filteredMarkers.map((item) => (

            <li key={item.id}>

              {<Marker position={[item.acf.lat, item.acf.lon]} icon={selectColor(item.acf.type)}>
                <Tooltip>{item.acf.nom} </Tooltip>
                <Popup>
                  <h2>{item.acf.nom}</h2>                  
                  <p>{item.acf.description}</p>
                  <a href={item.acf.lien} target="_blank">{item.acf.lien}</a>
                </Popup>
              </Marker>}
            </li>
          ))}
        </ul>
      }   
         <LocationMarker />
    </MapContainer>
    </>

  );
};

export default Carte;