import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, MessageSquare, UserCog, Search, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const { data: recentActivity } = useQuery({
    queryKey: ["/api/activity/user?limit=5"],
  });

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'viewed_map':
        return <MapPin className="w-4 h-4 text-feu-green" />;
      case 'submitted_feedback':
        return <MessageSquare className="w-4 h-4 text-feu-accent" />;
      case 'searched_room':
        return <Search className="w-4 h-4 text-feu-green-dark" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatActivityText = (activity: any) => {
    const details = activity.details ? JSON.parse(activity.details) : {};
    
    switch (activity.action) {
      case 'viewed_map':
        return `Viewed ${activity.building || 'campus map'}${activity.floor ? ` - Floor ${activity.floor}` : ''}`;
      case 'submitted_feedback':
        return `Submitted ${details.category || 'general'} feedback`;
      case 'searched_room':
        return `Searched for ${activity.room || 'location'}`;
      default:
        return activity.action.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="university-logo w-48 h-48 mx-auto mb-6"></div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome back, {user?.firstName}!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navigate our campus with ease using our interactive floor plans and comprehensive building directory.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setLocation("/guide-map")}>
            <CardContent className="p-6">
              <div className="text-feu-green mb-4">
                <MapPin className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Maps</h3>
              <p className="text-gray-600">Explore detailed 2D floor plans of all campus buildings</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setLocation("/user-feedback")}>
            <CardContent className="p-6">
              <div className="text-feu-gold mb-4">
                <MessageSquare className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Give Feedback</h3>
              <p className="text-gray-600">Help us improve the navigation experience</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setLocation("/account")}>
            <CardContent className="p-6">
              <div className="text-feu-green-light mb-4">
                <UserCog className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">My Account</h3>
              <p className="text-gray-600">Manage your profile and preferences</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity && recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity: any) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    {getActivityIcon(activity.action)}
                    <span className="text-gray-700 flex-1">
                      {formatActivityText(activity)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatTimeAgo(activity.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No recent activity to show</p>
                <Button 
                  onClick={() => setLocation("/guide-map")} 
                  className="mt-4 bg-feu-green hover:bg-feu-green-dark text-white"
                >
                  Start Exploring
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
