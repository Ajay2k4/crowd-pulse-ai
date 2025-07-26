import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Users, 
  Camera, 
  MessageSquare, 
  Shield, 
  Activity,
  Bell,
  MapPin,
  Clock,
  Eye
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([
    { id: 1, type: "critical", message: "High crowd density detected at Gate 2", time: "2 min ago", location: "East Entrance" },
    { id: 2, type: "warning", message: "Bottleneck prediction for Main Stage", time: "5 min ago", location: "Main Stage" },
    { id: 3, type: "success", message: "Lost person found - ID: LP001", time: "8 min ago", location: "West Wing" }
  ]);

  const [agentStatus] = useState([
    { name: "Anomaly Detection", status: "active", lastUpdate: "1 min ago" },
    { name: "Bottleneck Prediction", status: "active", lastUpdate: "30 sec ago" },
    { name: "Dispatch Agent", status: "active", lastUpdate: "2 min ago" },
    { name: "Lost & Found", status: "idle", lastUpdate: "5 min ago" },
    { name: "Situational Summary", status: "active", lastUpdate: "45 sec ago" }
  ]);

  const [liveStats] = useState({
    totalPeople: 12547,
    activeAlerts: 3,
    activeCameras: 24,
    responseTeams: 8
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Random new alert simulation
      if (Math.random() > 0.85) {
        const newAlert = {
          id: Date.now(),
          type: Math.random() > 0.7 ? "critical" : Math.random() > 0.5 ? "warning" : "success",
          message: "New incident detected",
          time: "Just now",
          location: ["Gate 1", "Gate 2", "Main Stage", "Food Court"][Math.floor(Math.random() * 4)]
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return "bg-critical text-critical-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      case "success": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-command-agent-active";
      case "idle": return "bg-command-agent-inactive";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-command-bg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Eye className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Project Drishti</h1>
            <p className="text-muted-foreground">Command Center Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-command-agent-active/20 text-command-agent-active border-command-agent-active">
            <Activity className="w-3 h-3 mr-1" />
            System Online
          </Badge>
          <Button variant="outline" onClick={() => navigate("/login")}>
            Logout
          </Button>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total People</p>
                <p className="text-2xl font-bold text-foreground">{liveStats.totalPeople.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-critical">{liveStats.activeAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-critical" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Live Cameras</p>
                <p className="text-2xl font-bold text-foreground">{liveStats.activeCameras}</p>
              </div>
              <Camera className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Teams</p>
                <p className="text-2xl font-bold text-foreground">{liveStats.responseTeams}</p>
              </div>
              <Shield className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Access critical system functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all duration-200"
              onClick={() => navigate("/agents")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              View All Agents
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/cameras")}
            >
              <Camera className="w-4 h-4 mr-2" />
              Live Camera Feeds
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                // Simulate emergency broadcast
                const broadcastMessage = prompt("Enter emergency broadcast message:");
                if (broadcastMessage) {
                  alert(`Emergency Broadcast Sent: "${broadcastMessage}"`);
                  // Add new critical alert
                  const emergencyAlert = {
                    id: Date.now(),
                    type: "critical",
                    message: `Emergency Broadcast: ${broadcastMessage}`,
                    time: "Just now",
                    location: "All Zones"
                  };
                  setAlerts(prev => [emergencyAlert, ...prev.slice(0, 4)]);
                }
              }}
            >
              <Bell className="w-4 h-4 mr-2" />
              Emergency Broadcast
            </Button>
          </CardContent>
        </Card>

        {/* Agent Status */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Agent Status
            </CardTitle>
            <CardDescription>AI agent operational status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {agentStatus.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                  <span className="text-sm font-medium text-foreground">{agent.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{agent.lastUpdate}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live Alerts */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Live Alerts
            </CardTitle>
            <CardDescription>Real-time incident notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-3 rounded-lg bg-muted/30 border-l-4 border-l-primary">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className={`text-xs mb-2 ${getAlertColor(alert.type)}`}>
                      {alert.type.toUpperCase()}
                    </Badge>
                    <p className="text-sm text-foreground mb-1">{alert.message}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {alert.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;