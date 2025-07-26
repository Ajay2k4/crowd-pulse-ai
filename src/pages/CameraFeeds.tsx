import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Camera, 
  Users, 
  AlertTriangle, 
  MapPin, 
  Activity,
  Maximize2,
  RefreshCw
} from "lucide-react";

interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: "active" | "maintenance" | "offline";
  crowdDensity: number;
  lastAnomaly: string | null;
  coordinates: { x: number; y: number };
}

const CameraFeeds = () => {
  const navigate = useNavigate();
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [feeds] = useState<CameraFeed[]>([
    {
      id: "cam-001",
      name: "Gate 1 Entrance",
      location: "East Entrance",
      status: "active",
      crowdDensity: 78,
      lastAnomaly: null,
      coordinates: { x: 0, y: 0 }
    },
    {
      id: "cam-002",
      name: "Gate 2 Entrance",
      location: "West Entrance",
      status: "active",
      crowdDensity: 92,
      lastAnomaly: "High density detected",
      coordinates: { x: 1, y: 0 }
    },
    {
      id: "cam-003",
      name: "Main Stage Area",
      location: "Central Stage",
      status: "active",
      crowdDensity: 65,
      lastAnomaly: null,
      coordinates: { x: 0, y: 1 }
    },
    {
      id: "cam-004",
      name: "Food Court",
      location: "North Food Area",
      status: "active",
      crowdDensity: 45,
      lastAnomaly: null,
      coordinates: { x: 1, y: 1 }
    },
    {
      id: "cam-005",
      name: "Emergency Exit A",
      location: "North Exit",
      status: "active",
      crowdDensity: 23,
      lastAnomaly: null,
      coordinates: { x: 0, y: 2 }
    },
    {
      id: "cam-006",
      name: "Emergency Exit B",
      location: "South Exit",
      status: "maintenance",
      crowdDensity: 0,
      lastAnomaly: null,
      coordinates: { x: 1, y: 2 }
    },
    {
      id: "cam-007",
      name: "Parking Area",
      location: "West Parking",
      status: "active",
      crowdDensity: 34,
      lastAnomaly: null,
      coordinates: { x: 2, y: 0 }
    },
    {
      id: "cam-008",
      name: "VIP Section",
      location: "Premium Area",
      status: "active",
      crowdDensity: 55,
      lastAnomaly: null,
      coordinates: { x: 2, y: 1 }
    }
  ]);

  const getDensityColor = (density: number) => {
    if (density > 80) return "text-critical";
    if (density > 60) return "text-warning";
    return "text-success";
  };

  const getDensityBg = (density: number) => {
    if (density > 80) return "bg-critical/20 border-critical/50";
    if (density > 60) return "bg-warning/20 border-warning/50";
    return "bg-success/20 border-success/50";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-command-agent-active text-white";
      case "maintenance": return "bg-warning text-warning-foreground";
      case "offline": return "bg-critical text-critical-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // Simulate camera frame updates
  const [frameUpdate, setFrameUpdate] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameUpdate(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-command-bg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Live Camera Feeds</h1>
            <p className="text-muted-foreground">Real-time CCTV monitoring across all zones</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-command-agent-active/20 text-command-agent-active border-command-agent-active">
            <Activity className="w-3 h-3 mr-1" />
            {feeds.filter(f => f.status === 'active').length} Cameras Online
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh All
          </Button>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {feeds.map((feed) => (
          <Card 
            key={feed.id} 
            className={`bg-card/50 border-border/50 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedCamera === feed.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedCamera(selectedCamera === feed.id ? null : feed.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-primary" />
                  <CardTitle className="text-sm">{feed.name}</CardTitle>
                </div>
                <Badge className={`text-xs ${getStatusColor(feed.status)}`}>
                  {feed.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1 text-xs">
                <MapPin className="w-3 h-3" />
                {feed.location}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Simulated Camera Frame */}
              <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/20" />
                {feed.status === "active" ? (
                  <div className="relative z-10 text-center">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Live Feed {frameUpdate % 3 + 1}</p>
                    <div className="absolute top-2 left-2">
                      <div className="w-2 h-2 bg-command-live-indicator rounded-full animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <AlertTriangle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Camera {feed.status}</p>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Crowd Density</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-16 h-2 rounded-full ${getDensityBg(feed.crowdDensity)}`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          feed.crowdDensity > 80 ? 'bg-critical' :
                          feed.crowdDensity > 60 ? 'bg-warning' : 'bg-success'
                        }`}
                        style={{ width: `${feed.crowdDensity}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${getDensityColor(feed.crowdDensity)}`}>
                      {feed.crowdDensity}%
                    </span>
                  </div>
                </div>

                {feed.lastAnomaly && (
                  <div className="flex items-start gap-2 p-2 rounded bg-critical/10 border border-critical/20">
                    <AlertTriangle className="w-3 h-3 text-critical mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-critical font-medium">Last Anomaly</p>
                      <p className="text-xs text-critical/80">{feed.lastAnomaly}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-muted-foreground">Updated: 2s ago</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <Maximize2 className="w-3 h-3 mr-1" />
                    Expand
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Camera Details */}
      {selectedCamera && (
        <Card className="mt-6 bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              {feeds.find(f => f.id === selectedCamera)?.name} - Detailed View
            </CardTitle>
            <CardDescription>Extended camera information and controls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Full Screen Feed</p>
                  <p className="text-xs text-muted-foreground mt-1">Click to expand to fullscreen</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-muted/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">People Count</p>
                          <p className="font-semibold text-foreground">
                            {Math.floor(Math.random() * 200) + 50}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Movement Rate</p>
                          <p className="font-semibold text-foreground">Normal</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Recent Activity</h4>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">• Person detection: 127 individuals</p>
                    <p className="text-xs text-muted-foreground">• Motion analysis: Steady flow</p>
                    <p className="text-xs text-muted-foreground">• Anomaly scan: Clear</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CameraFeeds;