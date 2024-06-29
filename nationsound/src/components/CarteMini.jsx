
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import { Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


function CarteMini(props) {
  


  
  return (
    <>
    <h1 className="sectionTitle colorRed"><Image src="/images/titleIcon.png"/>CARTE</h1>
    <Row className="justify-content-center m-4 p-2 border rounded bg-light">
    <Link to={"/Map"}> 
    <MapContainer  style={{ height: '300px', width: '50%'}} center={[48.8382 ,2.4427]} zoom={15} scrollWheelZoom={false} locate={{setView: true, maxZoom: 16}}>
    
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      
         
         
    </MapContainer>
    </Link>
    </Row>
    </>

  );
};

export default CarteMini;