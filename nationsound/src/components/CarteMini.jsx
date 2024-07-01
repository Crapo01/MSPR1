
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import { Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


function CarteMini(props) {
  


  
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
      
         
         
    </MapContainer>
    </Link>
    </Row>
    </>

  );
};

export default CarteMini;