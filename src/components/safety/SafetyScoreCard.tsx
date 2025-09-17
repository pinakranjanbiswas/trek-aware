import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SafetyScoreCardProps {
  score: number;
  location: string;
  trend?: 'up' | 'down' | 'stable';
  incidentCount?: number;
  lastUpdated?: string;
  riskFactors?: string[];
  className?: string;
}

const SafetyScoreCard: React.FC<SafetyScoreCardProps> = ({
  score,
  location,
  trend = 'stable',
  incidentCount = 0,
  lastUpdated,
  riskFactors = [],
  className
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Safe';
    if (score >= 60) return 'Moderate';
    return 'High Risk';
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <Card className={`glass hover-lift ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className={`w-5 h-5 ${getScoreColor(score)}`} />
            <span className="text-lg font-semibold">Safety Score</span>
          </div>
          <Badge variant={getScoreBadgeVariant(score)} className="font-medium">
            {getScoreLabel(score)}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Score Display */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
            {score}/100
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            {location}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Risk Level</span>
            <span className={`font-medium ${getScoreColor(score)}`}>
              {score}%
            </span>
          </div>
          <div className="relative">
            <Progress value={score} className="h-3" />
            <div 
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(score)}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="flex items-center justify-center gap-1 mb-1">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium">Incidents</span>
            </div>
            <div className="text-xl font-bold text-foreground">
              {incidentCount}
            </div>
            <div className="text-xs text-muted-foreground">
              Last 30 days
            </div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="flex items-center justify-center gap-1 mb-1">
              {getTrendIcon()}
              <span className="text-sm font-medium">Trend</span>
            </div>
            <div className="text-xl font-bold text-foreground capitalize">
              {trend}
            </div>
            <div className="text-xs text-muted-foreground">
              vs last week
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        {riskFactors.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Risk Factors</h4>
            <div className="flex flex-wrap gap-2">
              {riskFactors.map((factor, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {factor}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Last Updated */}
        {lastUpdated && (
          <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
            Last updated: {lastUpdated}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SafetyScoreCard;