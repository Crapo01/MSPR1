import { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import * as L from "leaflet";
import { Button, Col, Image, Row } from "react-bootstrap";
import RoutingMachine from "./RoutingMachine";
import { Link } from "react-router-dom";
import { ConcertContext } from "./context";



function Carte(props) {
  //  Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {}
  });

  const blueIcon = new LeafIcon({
    iconUrl:
      "./sound.png",
    iconAnchor: [20, 60],
    popupAnchor: [0, -60]
  }),
    greenIcon = new LeafIcon({
      iconUrl:
        "./food.png",
      iconAnchor: [20, 60]
    }),
    orangeIcon = new LeafIcon({
      iconUrl:
        "./toilet.png",
      iconAnchor: [20, 60]
    }),
    redIcon = new LeafIcon({
      iconUrl:
        "./info.png",
      iconAnchor: [20, 60]
    }),
    posIcon = new LeafIcon({
      iconUrl:
        "./pos.png",
      iconAnchor: [42, 38]
    });


    const groupe = useContext(ConcertContext)
  const [datas, setDatas] = useState([]);
  const [prog, setProg] = useState([]);
  const [filteredScenes, setFilteredScenes] = useState([]);
  const [position, setPosition] = useState(null);
  const [arrivee, setArrivee] = useState(null);
  const [locator, setLocator] = useState(false);
  const [virtualPosition, setVirtualposition] = useState(true);
  const [filter, setFilter] = useState("tout");

  const filteredMarkers = datas.filter
    ((event) =>
    (
      (event.acf.type === filter || filter === "tout")
    )
    )



  useEffect(() => {
    fetchWordPressData();
  }, []);
  


  async function fetchWordPressData() {
    console.log("fetch datas")
    console.log(datas,filteredScenes)
    try {
      let response = await fetch("https://nationsoundluc.rf.gd/wpdb/wp-json/acf/v3/pointeur");
      // let response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/pointeur");
      let data = await response.json();
      console.log("data1:"+data)
      if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };
      response = await fetch("https://nationsoundluc.rf.gd/wpdb/wp-json/acf/v3/concerts");
      // response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/concerts");
      data = await response.json();
      console.log("data2")
      console.log(data)
      if (data.code === "rest_no_route") { throw "error:rest_no_route" } else {
        
        setProg(data)

         
      };

    } catch (error) {
      console.log("Une erreur est survenue dans l'appel API: ")
      console.log(error)
    }
  }

  function onStageSorting() {
    let filteredProg = prog.filter((event) =>
        (
         
          parseInt(event.acf.date) === parseInt(new Date().toLocaleDateString()) + 10
          //  &&
          // event.acf.type === "concert"
        )
        )
    console.log(filteredProg)
        let temp=new Array;
        console.log("filteredProg")
        console.log(datas)
        filteredProg.map((e)=>(datas.map((ee)=> {
          const str= ee.acf.nom;
          console.log(e.acf.scene+":"+str.substr(6))
          if(e.acf.scene === str.substr(6)) temp.push({prog:e,mark:ee})
          }
        )))
        console.log(temp)
        setFilteredScenes(temp)
  }

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

  
  function LocationMarker() {
    console.log("vpos" + virtualPosition+"locator"+locator+"position"+position)

    if (locator && !position) {
      console.log("locating position")
      const map = useMap()
      map.locate({ setView: false, maxZoom: 16 });
      function onLocationFound(e) {

        virtualPosition ? setPosition({ lat: 48.837078, lng: 2.442521 }) : setPosition(e.latlng)
        console.log("located at:"+position)

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
      <Row className="  m-md-5 p-2 border rounded bg-light">
        <h1 className="sectionTitle colorRed linkNone d-flex justify-content-around "><Image src="/images/title1.png" />CARTE<Image src="/images/title4.png" /></h1>
        <Col className="d-flex justify-content-center">
          <div className="p-2">
            <p className="text-style4">Type de marqueur</p>
            <select onChange={(e) => {setFilter(e.target.value);e.target.value==="onStage"?onStageSorting():null}} value={filter} >
              <option value={"tout"}>tout</option>
              <option value={"scene"}>scenes</option>
              <option value={"informations"}>informations</option>
              <option value={"toilettes"}>toilettes</option>
              <option value={"alimentation"}>alimentation</option>
              <option value={"onStage"}>en cours</option>
            </select>
          </div>
        </Col>
        <Col className="d-flex justify-content-center">
          {!locator ?
            <button onClick={(e) => {alert("Activer la geolocalisation pour utiliser cette option"); setLocator(true) }}>Activer la geolocalisation</button> :
            <button onClick={(e) => { setLocator(false);setPosition(null) }}>Désactiver la geolocalisation</button>}
        </Col>
        <Col className="d-flex justify-content-center">
          <div className="p-2">
            <label htmlFor="Vpos">Utiliser la position GPS réelle</label>
            <input type="checkbox" id="Vpos" onChange={(e) => { setVirtualposition(!e.target.checked) }} />
          </div>
        </Col>

        

        <MapContainer style={{ height: props.h, width: props.w }} center={[48.8375, 2.4432]} maxZoom={17} zoom={17} scrollWheelZoom={false} locate={{ setView: true, maxZoom: 16 }}>

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
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
                      <br></br>
                      {locator ?
                        <button onClick={() => setArrivee([item.acf.lat, item.acf.lon])}>Y aller ...</button> : null}
                    </Popup>
                  </Marker>}
                </li>
              ))}
            </ul>
          }

          if ({filteredScenes.lenght > 0}) {
            
              
              <ul>
                {filteredScenes.map((item) => (

                  <li key={item.mark.id}>

                    {<Marker position={[item.mark.acf.lat, item.mark.acf.lon]} icon={selectColor(item.mark.acf.type)}>
                      <Popup>
                        <h2>{item.mark.acf.nom}</h2>
                        <h6>En cours: {item.prog.acf.nom}</h6>
                        <Link to={"/Details"} style={{ textDecoration: 'none' }} >
                                    <Button className='btn-dark my-2'
                                        onClick={() => (groupe.updateGroupe({ 
                                            nom: item.prog.acf.nom,
                                            image: item.prog.acf.photo.link,
                                            description: item.prog.acf.description,
                                            origine: item.prog.acf.continent,
                                            programmation: {date: item.prog.acf.date,heure: item.prog.acf.heure},
                                            scene: item.prog.acf.scene
                                            }))}>
                                        plus de details...
                                    </Button>
                                </Link>
                                <br />
                        {locator ?
                          <Button className='btn-dark my-2' onClick={() => setArrivee([item.mark.acf.lat, item.mark.acf.lon])}>Y aller ...</Button> : null}
                      </Popup>
                    </Marker>}
                  </li>
                ))}
              </ul>
            
          }

          <LocationMarker />




        </MapContainer>
      </Row>
    </>

  );
};

export default Carte;