import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import * as L from "leaflet";
import { Anchor, Col, Image, Row } from "react-bootstrap";
import RoutingMachine from "./RoutingMachine";



function Carte(props) {
  //  Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {}
  });

  const blueIcon = new LeafIcon({
    iconUrl:
      "./sound.png",
      iconAnchor:   [20, 60]
  }),
    greenIcon = new LeafIcon({
      iconUrl:
        "./food.png",
        iconAnchor:   [20, 60]
    }),
    orangeIcon = new LeafIcon({
      iconUrl:
        "./toilet.png",
        iconAnchor:   [20, 60]
    }),
    redIcon = new LeafIcon({
      iconUrl:
        "./info.png",
        iconAnchor:   [20, 60] 
    }),
    posIcon = new LeafIcon({
      iconUrl:
        "./pos.png",
        iconAnchor:   [42, 38] 
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
  const [position, setPosition] = useState(null);
  const [arrivee, setArrivee] = useState(null);
  const [locator, setLocator] = useState(false);
  const [virtualPosition, setVirtualposition] = useState(true);
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
  

  function InfoLocator() {
    console.log(locator)
    if(locator) return(<>
    <Col className="d-flex justify-content-center col-12">
    <div>
    <p>CLIQUER SUR UN MARQUEUR POUR ACTIVER L'ITINERAIRE</p>
    <p className="colorRed">Autoriser l'acces au GPS pour utiliser la fonction itineraire</p>
    </div>
    </Col>
    </>)
    else {
      setPosition(null)
      console.log("reset")
    }
  }

  

  function LocationMarker() {

console.log("vpos"+virtualPosition)
    
    if(locator && !position){
    const map = useMap()
    map.locate({setView: false, maxZoom: 16});
    function onLocationFound(e) {
      
      virtualPosition?setPosition({ lat: 48.837078, lng: 2.442521 }):setPosition(e.latlng)
      
  }
  
  map.on('locationfound', onLocationFound);
  setArrivee(position);
}
    return position === null ? null : (
      <>
        <Marker position={position} icon={posIcon}>
          <Popup>Vous etes ici</Popup>
        </Marker>        
        <RoutingMachine start={position} end={arrivee} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </>
    )
  }

  return (
    <>
      <h1 className="sectionTitle colorRed linkNone"><Image src="/images/titleIcon.png" />CARTE</h1>
      <Row className="justify-content-around m-4 p-2 border rounded bg-light">
        <Col className="d-flex justify-content-center">
        <div className="p-2">
          <p className="text-style4">Type de marqueur</p>
          <select onChange={(e) => setFilter(e.target.value)} value={filter} >
            <option value={"tout"}>tout</option>
            <option value={"scene"}>scenes</option>
            <option value={"informations"}>informations</option>
            <option value={"toilettes"}>toilettes</option>
            <option value={"alimentation"}>alimentation</option>
          </select>
          </div>
          </Col>
          <Col className="d-flex justify-content-center">
        {!locator?
        <button onClick={(e) => {setLocator(true)}}>Activer la geolocalisation</button>:
        <button onClick={(e) => {setLocator(false)}}>Désactiver la geolocalisation</button>}        
        </Col>
        <Col className="d-flex justify-content-center">
        <div className="p-2">
          <label htmlFor="Vpos">Utiliser la position GPS réelle</label>
        <input type="checkbox" id="Vpos"  onChange={(e) => {setVirtualposition(!e.target.checked)}}/>
        </div>
          </Col>
        
        <InfoLocator/>
        
        <MapContainer style={{ height: props.h, width: props.w }} center={[48.8375, 2.4432]} maxZoom= {17} zoom={17} scrollWheelZoom={false} locate={{ setView: true, maxZoom: 16 }}>

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          if ({filteredMarkers.lenght > 0}) {

            <ul>
              {filteredMarkers.map((item) => (

                <li key={item.id}>

                  {<Marker position={[item.acf.lat, item.acf.lon]} icon={selectColor(item.acf.type) }>
                    <Tooltip>{item.acf.nom} </Tooltip>
                    <Popup>
                      <h2>{item.acf.nom}</h2>
                      <p>{item.acf.description}</p>
                      <a href={item.acf.lien} target="_blank">{item.acf.lien}</a>
                      <br></br>
                      {locator?
                      <button onClick={()=>setArrivee([item.acf.lat, item.acf.lon])}>Y aller ...</button>:null}
                    </Popup>
                  </Marker>}
                </li>
              ))}
            </ul>
          }
          if({1===1})<LocationMarker />
            
            
          

        </MapContainer>
      </Row>
    </>

  );
};

export default Carte;