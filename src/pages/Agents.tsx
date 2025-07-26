import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  AlertTriangle, 
  MapPin, 
  Search, 
  Truck,
  FileText,
  Activity
} from "lucide-react";

interface Message {
  id: number;
  agent: string;
  content: string;
  timestamp: string;
  type: "user" | "agent";
  priority?: "high" | "medium" | "low";
}

const Agents = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState("anomaly-detection");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      agent: "anomaly-detection",
      content: "Anomaly Detection Agent online. Monitoring 24 camera feeds for crowd anomalies.",
      timestamp: "10:30 AM",
      type: "agent"
    },
    {
      id: 2,
      agent: "bottleneck-prediction",
      content: "Bottleneck Prediction Agent ready. Current prediction accuracy: 94.3%",
      timestamp: "10:31 AM",
      type: "agent"
    }
  ]);

  const agents = [
    {
      id: "anomaly-detection",
      name: "Anomaly Detection Agent",
      icon: AlertTriangle,
      status: "active",
      description: "Monitors video feeds for crowd anomalies",
      lastActivity: "2 min ago"
    },
    {
      id: "bottleneck-prediction",
      name: "Bottleneck Prediction Agent",
      icon: MapPin,
      status: "active",
      description: "Predicts crowd bottlenecks 15-20 min ahead",
      lastActivity: "1 min ago"
    },
    {
      id: "dispatch-agent",
      name: "Dispatch Agent",
      icon: Truck,
      status: "active",
      description: "Manages resource allocation and routing",
      lastActivity: "3 min ago"
    },
    {
      id: "lost-and-found",
      name: "Lost & Found Agent",
      icon: Search,
      status: "idle",
      description: "Photo matching for missing persons",
      lastActivity: "5 min ago"
    },
    {
      id: "situational-summary",
      name: "Situational Summary Agent",
      icon: FileText,
      status: "active",
      description: "Provides AI-powered situation briefings",
      lastActivity: "30 sec ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-command-agent-active text-white";
      case "idle": return "bg-command-agent-inactive text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      agent: selectedAgent,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "user"
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Simulate agent response
    setTimeout(() => {
      const responses = {
        "anomaly-detection": [
          "Analyzing current camera feeds... No anomalies detected in the last 60 seconds.",
          "Alert: Unusual crowd density pattern detected at Gate 2. Recommend investigation.",
          "Crowd flow analysis complete. All zones within normal parameters."
        ],
        "bottleneck-prediction": [
          "Current bottleneck risk: 23% at Main Stage entrance. Peak expected in 18 minutes.",
          "Prediction model updated with latest crowd data. Risk assessment in progress.",
          "Recommended action: Deploy additional staff to East corridor to prevent bottleneck."
        ],
        "dispatch-agent": [
          "3 response units available. Nearest unit is 2.5 minutes from your location.",
          "Route optimization complete. Fastest path avoiding crowd density calculated.",
          "Emergency medical team dispatched to Grid C-4. ETA: 4 minutes."
        ],
        "lost-and-found": [
          "Photo analysis initiated. Scanning all camera feeds for matching individuals.",
          "Match found: 87% confidence. Individual spotted at Food Court, Grid B-2.",
          "No matches found in current database. Expanding search parameters."
        ],
        "situational-summary": [
          "Current situation: GREEN. All zones operating within normal capacity.",
          "Summary: 3 active alerts, 2 resolved incidents, overall crowd mood: calm.",
          "Briefing complete: Main risks are at Gates 1&2 during peak hours. Recommend additional staffing."
        ]
      };

      const agentResponses = responses[selectedAgent as keyof typeof responses] || ["Agent response simulation"];
      const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];

      const agentMessage: Message = {
        id: Date.now() + 1,
        agent: selectedAgent,
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "agent",
        priority: Math.random() > 0.7 ? "high" : "medium"
      };

      setMessages(prev => [...prev, agentMessage]);
    }, 1500);
  };

  const filteredMessages = messages.filter(msg => msg.agent === selectedAgent);

  return (
    <div className="min-h-screen bg-command-bg p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Agents Interface</h1>
          <p className="text-muted-foreground">Interact with Project Drishti's AI agents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
        {/* Agent List */}
        <div className="lg:col-span-1">
          <Card className="bg-card/50 border-border/50 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Active Agents
              </CardTitle>
              <CardDescription>Select an agent to interact with</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedAgent === agent.id 
                      ? 'bg-primary/20 border-primary border' 
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <div className="flex items-start gap-3">
                    <agent.icon className="w-5 h-5 mt-1 text-primary" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground truncate">
                          {agent.name}
                        </span>
                        <Badge className={`text-xs ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{agent.description}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        {agent.lastActivity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="bg-card/50 border-border/50 h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3">
                {(() => {
                  const agent = agents.find(a => a.id === selectedAgent);
                  const IconComponent = agent?.icon || Bot;
                  return <IconComponent className="w-6 h-6 text-primary" />;
                })()}
                <div>
                  <CardTitle>
                    {agents.find(a => a.id === selectedAgent)?.name || "Agent"}
                  </CardTitle>
                  <CardDescription>
                    {agents.find(a => a.id === selectedAgent)?.description || "AI Agent Interface"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 space-y-4 mb-4 max-h-96 overflow-y-auto">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50 text-foreground'
                      }`}
                    >
                      {msg.type === 'agent' && msg.priority === 'high' && (
                        <Badge className="bg-critical text-critical-foreground text-xs mb-2">
                          HIGH PRIORITY
                        </Badge>
                      )}
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Message ${agents.find(a => a.id === selectedAgent)?.name || 'agent'}...`}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-muted/50"
                />
                <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Agents;