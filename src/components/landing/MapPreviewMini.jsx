/**
 * MapPreviewMini — a small interactive Leaflet map used in the Hero section.
 *
 * Shows a map of India with illustrative markers to demonstrate
 * the platform's geographic capabilities. This uses REAL map tiles
 * from OpenStreetMap, not a static image.
 *
 * Note: The markers are clearly illustrative demo data, not real incidents.
 */

import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Illustrative preview markers — NOT real disaster data
const PREVIEW_MARKERS = [
  {
    position: [28.6139, 77.209],
    label: 'Delhi — Flood Risk Zone',
    color: '#EF4444',
    radius: 10,
  },
  {
    position: [19.076, 72.8777],
    label: 'Mumbai — Cyclone Watch',
    color: '#F59E0B',
    radius: 9,
  },
  {
    position: [13.0827, 80.2707],
    label: 'Chennai — Heavy Rainfall',
    color: '#3B82F6',
    radius: 8,
  },
  {
    position: [22.5726, 88.3639],
    label: 'Kolkata — Monitoring',
    color: '#22C55E',
    radius: 7,
  },
  {
    position: [26.8467, 80.9462],
    label: 'Lucknow — Flood Alert',
    color: '#EF4444',
    radius: 8,
  },
  {
    position: [17.385, 78.4867],
    label: 'Hyderabad — Normal',
    color: '#22C55E',
    radius: 7,
  },
  {
    position: [23.2599, 77.4126],
    label: 'Bhopal — Fire Risk',
    color: '#F59E0B',
    radius: 8,
  },
]

function MapPreviewMini() {
  return (
    <MapContainer
      center={[22.5, 79]}
      zoom={5}
      scrollWheelZoom={false}
      dragging={true}
      zoomControl={false}
      attributionControl={false}
      className="w-full h-full"
      style={{ background: '#f0f3f7' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {PREVIEW_MARKERS.map((marker) => (
        <CircleMarker
          key={marker.label}
          center={marker.position}
          radius={marker.radius}
          pathOptions={{
            color: marker.color,
            fillColor: marker.color,
            fillOpacity: 0.3,
            weight: 2,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]}>
            <span className="text-xs font-medium">{marker.label}</span>
            <br />
            <span className="text-[10px] text-navy-400 italic">
              Illustrative preview
            </span>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

export default MapPreviewMini
