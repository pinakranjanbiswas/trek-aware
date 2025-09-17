import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, MapPin, Users, AlertTriangle, TrendingUp, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage = () => {
  const { signInWithGoogle, loading } = useAuth();

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-success" />,
      title: "Real-Time Safety Monitoring",
      description: "Get live updates on safety conditions in your area"
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Interactive Safety Maps",
      description: "Visualize safety zones with color-coded risk levels"
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-warning" />,
      title: "Emergency Response",
      description: "One-tap emergency alerts to local authorities"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: "Safety Analytics",
      description: "Track safety trends and patterns over time"
    },
    {
      icon: <Users className="w-8 h-8 text-primary-glow" />,
      title: "Community Driven",
      description: "Crowd-sourced safety information from local users"
    },
    {
      icon: <Globe className="w-8 h-8 text-success-glow" />,
      title: "Global Coverage",
      description: "Safety information for tourists worldwide"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <div className="relative min-h-screen overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 -right-4 w-80 h-80 bg-success/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-4 left-1/2 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-hero shadow-glow">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold gradient-text">
                SafeGuard
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your comprehensive safety companion for secure travel and peace of mind
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`glass hover-lift group animate-fade-in-${Math.min(index + 1, 6)}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Auth Section */}
          <div className="max-w-md mx-auto animate-fade-in-up">
            <Card className="glass shadow-floating">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">
                  Get Started
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Sign in to access your personalized safety dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  onClick={signInWithGoogle}
                  disabled={loading}
                  className="w-full h-12 bg-gradient-hero hover:opacity-90 transition-opacity duration-300 shadow-glow hover:shadow-glow-large"
                  size="lg"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {loading ? 'Signing in...' : 'Continue with Google'}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  By signing in, you'll be able to choose your role as either a tourist 
                  seeking safety information or a police officer managing incident reports.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Notice */}
          <div className="text-center mt-8 animate-fade-in-up">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              🔒 Your privacy and security are our top priorities. We use enterprise-grade 
              encryption and never share your personal information with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;