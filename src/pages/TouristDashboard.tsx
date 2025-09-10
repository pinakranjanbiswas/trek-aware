import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  User,
  Clock,
  Phone,
  Heart,
  Battery,
  Wifi,
  CheckCircle,
  XCircle,
  Navigation
} from "lucide-react";
import EmergencyButton from "@/components/EmergencyButton";
import SafetyMap from "@/components/SafetyMap";
import { useToast } from "@/hooks/use-toast";

interface SafetyMetrics {
  overall: number;
  location: number;
  connectivity: number;
  emergency: number;
}

interface TouristProfile {
  id: string;
  name: string;
  digitalId: string;
  checkInTime: string;
  plannedCheckOut: string;
  emergencyContact: string;
  status: 'active' | 'checking-out' | 'emergency';
}

const TouristDashboard = () => {
  const [safetyScore, setSafetyScore] = useState<SafetyMetrics>({
    overall: 85,
    location: 90,
    connectivity: 95,
    emergency: 75
  });
  
  const [profile, setProfile] = useState<TouristProfile>({
    id: "TST-001",
    name: "John Doe",
    digitalId: "0x7f9c...3a8b",
    checkInTime: new Date().toISOString(),
    plannedCheckOut: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    emergencyContact: "+1-555-0123",
    status: 'active'
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'info',
      message: 'Welcome to Northeast Tourism! Your digital ID is verified.',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      type: 'warning', 
      message: 'You are approaching a restricted area. Please stay in designated zones.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    }
  ]);

  const { toast } = useToast();

  useEffect(() => {
    // Simulate real-time safety score updates
    const interval = setInterval(() => {
      setSafetyScore(prev => ({
        ...prev,
        overall: Math.max(60, Math.min(100, prev.overall + (Math.random() - 0.5) * 10)),
        location: Math.max(70, Math.min(100, prev.location + (Math.random() - 0.5) * 8)),
        connectivity: Math.max(80, Math.min(100, prev.connectivity + (Math.random() - 0.5) * 5)),
        emergency: Math.max(60, Math.min(100, prev.emergency + (Math.random() - 0.5) * 12))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCheckOut = () => {
    setProfile(prev => ({ ...prev, status: 'checking-out' }));
    toast({
      title: "Check-out Initiated",
      description: "Processing your safe departure. Please wait...",
    });
    
    setTimeout(() => {
      toast({
        title: "Check-out Complete",
        description: "Thank you for visiting! Your visit has been logged safely.",
      });
    }, 3000);
  };

  const getSafetyColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-emergency";
  };

  const getSafetyBadge = (score: number) => {
    if (score >= 80) return "bg-success text-success-foreground";
    if (score >= 60) return "bg-warning text-warning-foreground";
    return "bg-emergency text-emergency-foreground";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tourist Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {profile.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getSafetyBadge(safetyScore.overall)}>
            <Shield className="mr-1 h-3 w-3" />
            Safety Score: {Math.round(safetyScore.overall)}%
          </Badge>
          <Badge variant="secondary">
            <User className="mr-1 h-3 w-3" />
            ID: {profile.digitalId}
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${getSafetyColor(safetyScore.overall)}`}>
              {Math.round(safetyScore.overall)}%
            </div>
            <p className="text-sm text-muted-foreground">Overall Safety</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">24h</div>
            <p className="text-sm text-muted-foreground">Monitoring</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              <CheckCircle className="h-6 w-6 mx-auto" />
            </div>
            <p className="text-sm text-muted-foreground">Verified ID</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              <MapPin className="h-6 w-6 mx-auto" />
            </div>
            <p className="text-sm text-muted-foreground">Live Tracking</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="map">Live Map</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Safety Metrics */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Safety Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Location Safety</span>
                    <span className={`text-sm font-medium ${getSafetyColor(safetyScore.location)}`}>
                      {Math.round(safetyScore.location)}%
                    </span>
                  </div>
                  <Progress value={safetyScore.location} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Connectivity</span>
                    <span className={`text-sm font-medium ${getSafetyColor(safetyScore.connectivity)}`}>
                      {Math.round(safetyScore.connectivity)}%
                    </span>
                  </div>
                  <Progress value={safetyScore.connectivity} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Emergency Readiness</span>
                    <span className={`text-sm font-medium ${getSafetyColor(safetyScore.emergency)}`}>
                      {Math.round(safetyScore.emergency)}%
                    </span>
                  </div>
                  <Progress value={safetyScore.emergency} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Emergency Panel */}
            <EmergencyButton />

            {/* System Status */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-success" />
                    <span className="text-sm">Network</span>
                  </div>
                  <Badge className="bg-success text-success-foreground">Online</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-warning" />
                    <span className="text-sm">Device</span>
                  </div>
                  <Badge className="bg-warning text-warning-foreground">75%</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-success" />
                    <span className="text-sm">GPS</span>
                  </div>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span className="text-sm">Health Monitor</span>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Normal</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'warning' 
                        ? 'border-warning bg-warning/5' 
                        : 'border-primary bg-primary/5'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Safety Guidelines</CardTitle>
                <CardDescription>Important safety information for your visit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">Stay in designated areas</p>
                      <p className="text-sm text-muted-foreground">Avoid restricted zones marked in red on the map</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">Keep emergency contacts updated</p>
                      <p className="text-sm text-muted-foreground">Ensure your emergency contact information is current</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">Maintain device battery</p>
                      <p className="text-sm text-muted-foreground">Keep your device charged for continuous monitoring</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
                <CardDescription>Quick access to emergency services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emergency/5 rounded-lg border border-emergency/20">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-emergency" />
                      <div>
                        <p className="font-medium">Emergency Services</p>
                        <p className="text-sm text-muted-foreground">24/7 Emergency Response</p>
                      </div>
                    </div>
                    <Button variant="emergency" size="sm">
                      Call 911
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">Tourist Police</p>
                        <p className="text-sm text-muted-foreground">Specialized tourist assistance</p>
                      </div>
                    </div>
                    <Button variant="default" size="sm">
                      Call Help
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20">
                    <div className="flex items-center gap-3">
                      <Heart className="h-4 w-4 text-success" />
                      <div>
                        <p className="font-medium">Medical Emergency</p>
                        <p className="text-sm text-muted-foreground">Immediate medical assistance</p>
                      </div>
                    </div>
                    <Button variant="success" size="sm">
                      Medical
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map">
          <SafetyMap />
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Digital Identity</CardTitle>
                <CardDescription>Your blockchain-secured tourist profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Tourist ID</label>
                    <p className="text-sm text-muted-foreground font-mono">{profile.id}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Blockchain Address</label>
                    <p className="text-sm text-muted-foreground font-mono">{profile.digitalId}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <p className="text-sm text-muted-foreground">{profile.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Badge className={
                      profile.status === 'active' ? 'bg-success text-success-foreground' :
                      profile.status === 'checking-out' ? 'bg-warning text-warning-foreground' :
                      'bg-emergency text-emergency-foreground'
                    }>
                      {profile.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Visit Details</CardTitle>
                <CardDescription>Your current visit information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Check-in Time</label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(profile.checkInTime).toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Planned Check-out</label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(profile.plannedCheckOut).toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Emergency Contact</label>
                    <p className="text-sm text-muted-foreground">{profile.emergencyContact}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleCheckOut}
                    disabled={profile.status === 'checking-out'}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {profile.status === 'checking-out' ? 'Processing...' : 'Initiate Check-out'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TouristDashboard;