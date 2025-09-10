import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface EmergencyButtonProps {
  onEmergency?: () => void;
}

const EmergencyButton = ({ onEmergency }: EmergencyButtonProps) => {
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const handleEmergencyPress = () => {
    if (isActivated) return;

    setIsActivated(true);
    setCountdown(3);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerEmergency();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const triggerEmergency = () => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Simulate emergency alert
          toast({
            title: "🚨 EMERGENCY ALERT TRIGGERED",
            description: `Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)} - Authorities notified!`,
            variant: "destructive",
          });

          // Mock emergency services notification
          const emergencyData = {
            timestamp: new Date().toISOString(),
            location: { lat: latitude, lng: longitude },
            type: "panic_button",
            status: "active"
          };

          console.log("Emergency triggered:", emergencyData);
          onEmergency?.();
          
          // Reset after 5 seconds
          setTimeout(() => {
            setIsActivated(false);
          }, 5000);
        },
        (error) => {
          toast({
            title: "🚨 EMERGENCY ALERT TRIGGERED",
            description: "Location unavailable - Authorities notified!",
            variant: "destructive",
          });
          setIsActivated(false);
        }
      );
    }
  };

  const cancelEmergency = () => {
    setIsActivated(false);
    setCountdown(0);
    toast({
      title: "Emergency Cancelled",
      description: "Alert has been cancelled.",
    });
  };

  return (
    <Card className={`transition-all duration-300 ${
      isActivated 
        ? "shadow-emergency border-emergency animate-pulse" 
        : "shadow-soft hover:shadow-medium"
    }`}>
      <CardContent className="p-6 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className={`p-4 rounded-full transition-all duration-300 ${
              isActivated 
                ? "bg-emergency text-emergency-foreground animate-bounce" 
                : "bg-emergency/10 text-emergency"
            }`}>
              <AlertTriangle className="h-8 w-8" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">
              {isActivated ? "EMERGENCY ACTIVATED" : "Emergency Alert"}
            </h3>
            <p className="text-muted-foreground text-sm">
              {isActivated 
                ? `Alerting authorities in ${countdown} seconds...`
                : "Press and hold for 3 seconds in case of emergency"
              }
            </p>
          </div>

          {!isActivated ? (
            <Button
              variant="destructive"
              size="lg"
              onMouseDown={handleEmergencyPress}
              className="w-full bg-emergency hover:bg-emergency-glow shadow-emergency"
            >
              <AlertTriangle className="mr-2 h-5 w-5" />
              PANIC BUTTON
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="text-6xl font-bold text-emergency animate-pulse">
                {countdown}
              </div>
              <Button
                variant="outline"
                onClick={cancelEmergency}
                className="w-full"
              >
                Cancel Alert
              </Button>
            </div>
          )}

          <div className="flex justify-around text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>Auto-call 911</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Share location</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyButton;