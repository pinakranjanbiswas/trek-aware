import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, AlertTriangle, Shield, Navigation } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SafetyZone {
  id: string;
  name: string;
  location_lat: number;
  location_lng: number;
  safety_score: number;
  description?: string;
  created_at: string;
  radius_meters: number;
}

// Helper function to calculate risk level from safety score
const getRiskLevel = (score: number): 'low' | 'medium' | 'high' => {
  if (score >= 80) return 'low';
  if (score >= 60) return 'medium';
  return 'high';
};

interface GoogleMapComponentProps {
  initialCenter?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  showCurrentLocation?: boolean;
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
}

const containerStyle = {
  width: '100%',
  height: '500px'
};

const defaultCenter = {
  lat: 28.6139, // Delhi, India
  lng: 77.2090
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  initialCenter = defaultCenter,
  zoom = 12,
  height = '500px',
  showCurrentLocation = true,
  onLocationSelect
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [safetyZones, setSafetyZones] = useState<SafetyZone[]>([]);
  const [selectedZone, setSelectedZone] = useState<SafetyZone | null>(null);
  const [loading, setLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  // Get current location
  useEffect(() => {
    if (showCurrentLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(pos);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Could not get current location');
        }
      );
    }
  }, [showCurrentLocation]);

  // Fetch safety zones
  useEffect(() => {
    const fetchSafetyZones = async () => {
      try {
        const { data, error } = await supabase
          .from('safety_zones')
          .select('*')
          .order('safety_score', { ascending: false });

        if (error) throw error;

        setSafetyZones(data || []);
      } catch (error) {
        console.error('Error fetching safety zones:', error);
        toast.error('Failed to load safety zones');
      } finally {
        setLoading(false);
      }
    };

    fetchSafetyZones();
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng && onLocationSelect) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      onLocationSelect({ lat, lng });
    }
  }, [onLocationSelect]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return '#22c55e'; // green
      case 'medium':
        return '#f59e0b'; // yellow
      case 'high':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  };

  const getRiskBadgeVariant = (riskLevel: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (riskLevel) {
      case 'low':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'high':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getLocationName = useCallback(async (lat: number, lng: number): Promise<string> => {
    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ location: { lat, lng } });
      
      if (result.results[0]) {
        return result.results[0].formatted_address;
      }
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      console.error('Geocoding error:', error);
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  }, []);

  if (!isLoaded) {
    return (
      <Card className="w-full" style={{ height }}>
        <CardContent className="flex items-center justify-center h-full">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-muted-foreground">Loading map...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full" style={{ height }}>
      <GoogleMap
        mapContainerStyle={{ ...containerStyle, height }}
        center={currentLocation || initialCenter}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'off' }]
            }
          ]
        }}
      >
        {/* Current Location Marker */}
        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#3b82f6',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
              scale: 8
            }}
            title="Your Location"
          />
        )}

        {/* Safety Zone Markers and Circles */}
        {safetyZones.map((zone) => {
          const riskLevel = getRiskLevel(zone.safety_score);
          return (
            <React.Fragment key={zone.id}>
              {/* Safety Circle */}
              <Circle
                center={{ lat: zone.location_lat, lng: zone.location_lng }}
                radius={zone.radius_meters || 1000}
                options={{
                  fillColor: getRiskColor(riskLevel),
                  fillOpacity: 0.15,
                  strokeColor: getRiskColor(riskLevel),
                  strokeOpacity: 0.6,
                  strokeWeight: 2
                }}
              />
              
              {/* Zone Marker */}
              <Marker
                position={{ lat: zone.location_lat, lng: zone.location_lng }}
                onClick={() => setSelectedZone(zone)}
                icon={{
                  path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                  fillColor: getRiskColor(riskLevel),
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                  scale: 6,
                  rotation: 180
                }}
                title={zone.name}
              />
            </React.Fragment>
          );
        })}

        {/* Info Window */}
        {selectedZone && (
          <InfoWindow
            position={{ lat: selectedZone.location_lat, lng: selectedZone.location_lng }}
            onCloseClick={() => setSelectedZone(null)}
          >
            <div className="p-2 max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">{selectedZone.name}</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Risk Level:</span>
                  <Badge variant={getRiskBadgeVariant(getRiskLevel(selectedZone.safety_score))} className="text-xs">
                    {getRiskLevel(selectedZone.safety_score).toUpperCase()}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Safety Score:</span>
                  <span className="text-xs font-medium">
                    {selectedZone.safety_score}/100
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Coverage:</span>
                  <span className="text-xs font-medium">
                    {(selectedZone.radius_meters / 1000).toFixed(1)}km radius
                  </span>
                </div>
                
                {selectedZone.description && (
                  <p className="text-xs text-gray-600 mt-2">
                    {selectedZone.description}
                  </p>
                )}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        {showCurrentLocation && (
          <Button
            size="sm"
            variant="secondary"
            className="glass"
            onClick={() => {
              if (currentLocation && map) {
                map.panTo(currentLocation);
              }
            }}
          >
            <Navigation className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-muted-foreground">Loading safety zones...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapComponent;