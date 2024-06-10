import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


function Carte(props) {
    return (
         
            <MapContainer style={{height: props.h, width: props.w}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      Scene ouest <br /> details
    </Popup>
  </Marker>
</MapContainer>

        
    );
};

export default Carte;