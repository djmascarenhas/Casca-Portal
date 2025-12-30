import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// Leaflet icon fix for React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LOCATIONS = [
  { id: 1, name: "Santuário de Elefantes", coords: [-15.4299, -55.7001], desc: "Refúgio de vida selvagem." },
  { id: 2, name: "Chalé dos Governadores", coords: [-15.4200, -55.7100], desc: "Patrimônio histórico." },
  { id: 3, name: "Usina da Casca", coords: [-15.4250, -55.7150], desc: "Cachoeira e ruínas." },
  { id: 4, name: "Comunidade Rio da Casca", coords: [-15.4220, -55.7050], desc: "Centro da comunidade." },
];

export function InteractiveMap() {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg z-0 relative">
      <MapContainer 
        center={[-15.4220, -55.7050]} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {LOCATIONS.map(loc => (
          <Marker key={loc.id} position={loc.coords as [number, number]}>
            <Popup>
              <div className="font-ui text-sm">
                <strong className="block text-primary mb-1">{loc.name}</strong>
                {loc.desc}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
