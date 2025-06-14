import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  User, 
  Folder, 
  Bell, 
  Settings, 
  FileText, 
  Image as ImageIcon,
  Info,
  CheckCircle 
} from "lucide-react";

export default function Account() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: notifications } = useQuery({
    queryKey: ["/api/activity/user?limit=10"],
    enabled: isAuthenticated,
  });

  if (isLoading || !isAuthenticated) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  const mockFiles = [
    {
      name: "Campus_Map_Guide.pdf",
      size: "2.1 MB",
      type: "pdf",
      icon: <FileText className="w-5 h-5 text-red-500" />
    },
    {
      name: "Building_Photos.zip", 
      size: "15.3 MB",
      type: "zip",
      icon: <ImageIcon className="w-5 h-5 text-blue-500" />
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      type: "info",
      title: "New map data available",
      message: "Updated floor plans for Engineering Building",
      time: "2 hours ago",
      icon: <Info className="w-5 h-5 text-blue-500" />
    },
    {
      id: 2,
      type: "success", 
      title: "Feedback submitted successfully",
      message: "Thank you for your improvement suggestion",
      time: "1 day ago",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Account Management</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={user?.profileImageUrl || ""} />
                    <AvatarFallback className="text-lg">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {user?.role === 'student' ? 'Computer Science Student' : 'Faculty Member'}
                  </p>
                  <Button className="mt-4 bg-feu-green hover:bg-feu-green-dark text-white">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Options */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Files Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Folder className="w-5 h-5 mr-3 text-feu-green" />
                    My Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {file.icon}
                          <span>{file.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{file.size}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-3 text-feu-accent" />
                    Notifications
                    <Badge variant="destructive" className="ml-auto">
                      3 New
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        {notification.icon}
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-3 text-gray-600" />
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Email Notifications</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Dark Mode</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Location Services</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
