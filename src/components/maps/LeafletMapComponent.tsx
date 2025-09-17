import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Shield, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Fix for default markers in React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerIcon2x,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const safeIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="24" height="24">
      <path d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 19L5.82 22L7 14L2 9L10.91 8.26L12 2Z"/>
    </svg>
  `)}`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const warningIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" width="24" height="24">
      <path d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 19L5.82 22L7 14L2 9L10.91 8.26L12 2Z"/>
    </svg>
  `)}`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const dangerIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24" height="24">
      <path d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 19L5.82 22L7 14L2 9L10.91 8.26L12 2Z"/>
    </svg>
  `)}`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

interface SafetyZone {
  id: string;
  name: string;
  location_lat: number;
  location_lng: number;
  safety_score: number;
  radius_meters: number;
  description?: string;
}

interface SafetyIncident {
  id: string;
  incident_type: string;
  description?: string;
  location_lat?: number;
  location_lng?: number;
  location_name?: string;
  severity: string;
  created_at: string;
}

interface LeafletMapComponentProps {
  center?: LatLngTuple;
  zoom?: number;
  height?: string;
  showSafetyZones?: boolean;
  showIncidents?: boolean;
}

const LeafletMapComponent: React.FC<LeafletMapComponentProps> = ({
  center = [28.6139, 77.2090], // Default to Delhi
  zoom = 12,
  height = '400px',
  showSafetyZones = true,
  showIncidents = true,
}) => {
  const [safetyZones, setSafetyZones] = useState<SafetyZone[]>([]);
  const [incidents, setIncidents] = useState<SafetyIncident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [zonesResponse, incidentsResponse] = await Promise.all([
          showSafetyZones ? supabase.from('safety_zones').select('*') : Promise.resolve({ data: [] }),
          showIncidents ? supabase.from('safety_incidents').select('*').limit(50) : Promise.resolve({ data: [] })
        ]);

        if (zonesResponse.data) setSafetyZones(zonesResponse.data);
        if (incidentsResponse.data) setIncidents(incidentsResponse.data);
      } catch (error) {
        console.error('Error fetching map data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showSafetyZones, showIncidents]);

  const getZoneColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getZoneIcon = (score: number) => {
    if (score >= 80) return safeIcon;
    if (score >= 60) return warningIcon;
    return dangerIcon;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <Card className="w-full" style={{ height }}>
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">Loading map...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Safety Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div style={{ height }}>
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Safety Zones */}
            {showSafetyZones && safetyZones.map((zone) => (
              <React.Fragment key={zone.id}>
                <Circle
                  center={[zone.location_lat, zone.location_lng]}
                  radius={zone.radius_meters}
                  fillColor={getZoneColor(zone.safety_score)}
                  fillOpacity={0.2}
                  color={getZoneColor(zone.safety_score)}
                  weight={2}
                />
                <Marker
                  position={[zone.location_lat, zone.location_lng]}
                  icon={getZoneIcon(zone.safety_score)}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{zone.name}</h3>
                        <Badge 
                          variant={zone.safety_score >= 80 ? "default" : zone.safety_score >= 60 ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {zone.safety_score}/100
                        </Badge>
                      </div>
                      {zone.description && (
                        <p className="text-xs text-muted-foreground mb-2">{zone.description}</p>
                      )}
                      <div className="flex items-center gap-2 text-xs">
                        <Shield className="w-3 h-3" />
                        <span>Radius: {zone.radius_meters}m</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}

            {/* Safety Incidents */}
            {showIncidents && incidents.map((incident) => (
              incident.location_lat && incident.location_lng && (
                <Marker
                  key={incident.id}
                  position={[incident.location_lat, incident.location_lng]}
                  icon={new Icon({
                    iconUrl: `data:image/svg+xml;base64,${btoa(`
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${getSeverityColor(incident.severity)}" width="20" height="20">
                        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 22L12 19L5.82 22L7 14L2 9L8.91 8.26L12 2Z"/>
                      </svg>
                    `)}`,
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                  })}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{incident.incident_type}</h3>
                        <Badge 
                          variant={incident.severity === 'low' ? "default" : incident.severity === 'medium' ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {incident.severity}
                        </Badge>
                      </div>
                      {incident.description && (
                        <p className="text-xs text-muted-foreground mb-2">{incident.description}</p>
                      )}
                      <div className="flex items-center gap-2 text-xs">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{new Date(incident.created_at).toLocaleDateString()}</span>
                      </div>
                      {incident.location_name && (
                        <div className="text-xs text-muted-foreground mt-1">
                          📍 {incident.location_name}
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeafletMapComponent;