import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Smartphone,
  Lock,
  Zap,
  Globe,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-safety.jpg";
import dashboardImage from "@/assets/dashboard-preview.jpg";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Digital ID",
      description: "Tamper-proof tourist identification with secure KYC verification",
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: "Real-time Geo-fencing",
      description: "Smart location tracking with automated safety zone alerts",
      color: "text-success"
    },
    {
      icon: AlertTriangle,
      title: "AI Anomaly Detection",
      description: "Advanced AI monitors for distress patterns and missing behavior",
      color: "text-warning"
    },
    {
      icon: Smartphone,
      title: "Mobile Safety App",
      description: "Comprehensive tourist app with panic button and live tracking",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Police Dashboard",
      description: "Real-time monitoring with cluster maps and automated alerts",
      color: "text-emergency"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Accessible platform supporting multiple languages and cultures",
      color: "text-success"
    }
  ];

  const benefits = [
    "Real-time monitoring reduces tourist risks by 70%",
    "Blockchain ensures tamper-proof identity records",
    "Panic alerts enable 5x faster emergency response",
    "AI-powered insights improve prevention strategies",
    "End-to-end encryption protects user privacy"
  ];

  const stats = [
    { value: "24/7", label: "Monitoring" },
    { value: "99.9%", label: "Uptime" },
    { value: "<30s", label: "Alert Response" },
    { value: "256-bit", label: "Encryption" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-primary-glow/20 text-primary-foreground border-primary-glow/30">
            🔒 Blockchain-Powered Tourist Safety
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Smart Tourist Safety
            <br />
            <span className="bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Monitoring System
            </span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Advanced AI-powered safety monitoring with blockchain-based digital IDs, 
            real-time geo-fencing, and emergency response system for comprehensive tourist protection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/tourist">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                <Smartphone className="mr-2 h-5 w-5" />
                Tourist Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/police">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Shield className="mr-2 h-5 w-5" />
                Police Portal
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Advanced Safety Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive technology stack ensuring tourist safety through multiple layers of protection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 border-0 bg-card">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-glass border flex items-center justify-center mb-4 ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Proven Safety Benefits
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our system has demonstrated significant improvements in tourist safety 
                and emergency response effectiveness.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-success mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/analytics" className="inline-block mt-8">
                <Button variant="default" size="lg">
                  View Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img 
                src={dashboardImage} 
                alt="Safety Dashboard" 
                className="rounded-lg shadow-medium w-full"
              />
              <div className="absolute inset-0 bg-gradient-glass rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Enterprise-Grade Technology
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Built with cutting-edge technologies for reliability, security, and scalability
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              "React.js", "Blockchain", "AI/ML", "IoT", "Node.js", "Firebase"
            ].map((tech, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 p-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{tech}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Lock className="h-16 w-16 text-primary-foreground mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Enhance Tourist Safety?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join the next generation of smart tourism safety management
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tourist">
              <Button variant="hero" size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                <Smartphone className="mr-2 h-5 w-5" />
                Start as Tourist
              </Button>
            </Link>
            <Link to="/police">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10">
                <Shield className="mr-2 h-5 w-5" />
                Access Admin Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;