import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, MapPin, Shield, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RoleSelector = () => {
  const { updateUserRole, user } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = async (role: 'tourist' | 'police') => {
    await updateUserRole(role);
    if (role === 'tourist') {
      navigate('/tourist');
    } else {
      navigate('/police');
    }
  };

  const roles = [
    {
      id: 'tourist',
      title: 'Tourist / Traveler',
      description: 'Access safety information, view risk zones, and get real-time alerts',
      icon: <MapPin className="w-12 h-12 text-primary" />,
      features: [
        'Interactive safety maps',
        'Real-time alerts',
        'Emergency assistance',
        'Location-based safety scores',
        'Travel recommendations'
      ],
      gradient: 'bg-gradient-hero',
      textColor: 'text-primary'
    },
    {
      id: 'police',
      title: 'Police Officer',
      description: 'Manage incidents, monitor safety zones, and coordinate emergency response',
      icon: <Shield className="w-12 h-12 text-success" />,
      features: [
        'Incident management system',
        'Safety zone monitoring',
        'Emergency response coordination',
        'Analytics dashboard',
        'Community alerts management'
      ],
      gradient: 'bg-gradient-success',
      textColor: 'text-success'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <div className="relative min-h-screen overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 -right-4 w-80 h-80 bg-success/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-success flex items-center justify-center shadow-glow">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Choose Your Role
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Welcome, {user?.user_metadata?.full_name || user?.email}! 
              Select how you'd like to use SafeGuard.
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {roles.map((role, index) => (
              <Card 
                key={role.id}
                className={`glass hover-lift interactive-card group animate-fade-in-${index + 1} cursor-pointer`}
                onClick={() => handleRoleSelect(role.id as 'tourist' | 'police')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {role.icon}
                  </div>
                  <CardTitle className={`text-2xl font-bold ${role.textColor} mb-2`}>
                    {role.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features List */}
                  <div className="space-y-3">
                    {role.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${role.gradient}`}></div>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full h-12 ${role.gradient} hover:opacity-90 transition-opacity duration-300 shadow-glow hover:shadow-glow-large text-white font-semibold`}
                    size="lg"
                  >
                    Continue as {role.title.split(' ')[0]}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <div className="text-center mt-12 animate-fade-in-up">
            <Card className="glass max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">
                    Can I change my role later?
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Yes! You can switch between roles at any time from your profile settings. 
                  Your data and preferences will be preserved across role changes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;