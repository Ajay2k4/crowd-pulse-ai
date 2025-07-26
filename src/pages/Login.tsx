import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "operator"
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app would validate credentials
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-command-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3">
              <Eye className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Project Drishti</h1>
          </div>
          <p className="text-muted-foreground">AI-Powered Crowd Safety Command Center</p>
        </div>

        <Card className="border-border/50 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5" />
              Secure Access
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the command center
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="bg-muted/50"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="bg-muted/50"
                  required
                />
              </div>
              <div>
                <select
                  value={credentials.role}
                  onChange={(e) => setCredentials({...credentials, role: e.target.value})}
                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-md text-foreground"
                >
                  <option value="operator">Field Operator</option>
                  <option value="admin">Admin Commander</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all duration-200">
                Access Command Center
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Emergency Access: contact@drishti-command.ai</p>
        </div>
      </div>
    </div>
  );
};

export default Login;