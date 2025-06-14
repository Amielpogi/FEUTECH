import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Home, 
  User, 
  Map, 
  MessageCircle, 
  Info, 
  HelpCircle,
  Menu
} from "lucide-react";

const navigationItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/account", label: "Account", icon: User },
  { path: "/guide-map", label: "Guide Map", icon: Map },
  { path: "/user-feedback", label: "User Feedback", icon: MessageCircle },
  { path: "/about-us", label: "About us", icon: Info },
  { path: "/help", label: "Help", icon: HelpCircle },
];

export default function Sidebar() {
  const [location, setLocation] = useLocation();

  return (
    <nav className="sidebar flex-shrink-0">
      <div className="p-4">
        {/* Mobile Menu Toggle */}
        <Button variant="ghost" className="md:hidden mb-4 p-2">
          <Menu className="w-5 h-5 text-gray-600" />
        </Button>
        
        {/* Navigation Links */}
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <li key={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-4 py-3 text-gray-700 hover:bg-white hover:shadow-sm transition-all",
                    isActive && "bg-white shadow-sm"
                  )}
                  onClick={() => setLocation(item.path)}
                >
                  <Icon className="w-5 h-5 mr-3 text-gray-500" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
