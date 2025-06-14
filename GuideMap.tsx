import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { 
  User, 
  LogOut,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  Map,
  MessageCircle,
  Info,
  HelpCircle
} from "lucide-react";

// FEU Tech room data based on floor plan
const roomData = {
  "F601": {
    name: "Room F601",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Classroom/Laboratory facility"
  },
  "F602": {
    name: "Room F602", 
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Classroom/Laboratory facility"
  },
  "F603": {
    name: "Room F603",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Classroom/Laboratory facility"
  },
  "F604": {
    name: "Room F604",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Classroom/Laboratory facility"
  },
  "F605": {
    name: "Room F605",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Classroom/Laboratory facility"
  },
  "F606": {
    name: "Room F606",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Classroom/Laboratory facility"
  },
  "F607": {
    name: "Room F607",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Classroom/Laboratory facility"
  },
  "F608": {
    name: "Room F608",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Classroom/Laboratory facility"
  },
  "F609": {
    name: "Room F609",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Classroom/Laboratory facility"
  },
  "F610": {
    name: "Room F610",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Classroom/Laboratory facility"
  },
  "F611": {
    name: "Room F611",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Classroom/Laboratory facility"
  },
  "F612": {
    name: "Room F612",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Large classroom/Laboratory facility"
  },
  "STAIRS": {
    name: "Stairwell",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Emergency stairwell access"
  },
  "FIRE_EXIT": {
    name: "Fire Exit 2",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Emergency fire exit"
  }
};

export default function GuideMap() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { toast } = useToast();
  const [selectedFloor, setSelectedFloor] = useState("6");
  const [currentLocation, setCurrentLocation] = useState("F601");
  const [showRoomImage, setShowRoomImage] = useState<string | null>(null);

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

  const logMapViewMutation = useMutation({
    mutationFn: async (data: { building: string; floor: string; room?: string }) => {
      await apiRequest("POST", "/api/map/view", data);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
    },
  });

  const handleFloorSelect = (floor: string) => {
    setSelectedFloor(floor);
    logMapViewMutation.mutate({ building: "Main Building", floor });
  };

  const handleJoystickMove = (direction: string) => {
    const roomLayout = [
      ["", "F601", "", "F602", "F603", "F604", "", "F605"],
      ["F612", "", "", "STAIRS", "FIRE_EXIT", "", "", ""],
      ["", "F611", "F610", "F609", "F608", "F607", "F606", ""]
    ];
    
    let currentRow = 0;
    let currentCol = 0;
    
    // Find current position
    for (let row = 0; row < roomLayout.length; row++) {
      for (let col = 0; col < roomLayout[row].length; col++) {
        if (roomLayout[row][col] === currentLocation) {
          currentRow = row;
          currentCol = col;
          break;
        }
      }
    }
    
    let newRow = currentRow;
    let newCol = currentCol;
    
    switch (direction) {
      case "up":
        newRow = Math.max(0, currentRow - 1);
        break;
      case "down":
        newRow = Math.min(roomLayout.length - 1, currentRow + 1);
        break;
      case "left":
        newCol = Math.max(0, currentCol - 1);
        break;
      case "right":
        newCol = Math.min(roomLayout[0].length - 1, currentCol + 1);
        break;
    }
    
    const newLocation = roomLayout[newRow][newCol];
    if (newLocation && newLocation !== currentLocation) {
      setCurrentLocation(newLocation);
      logMapViewMutation.mutate({ 
        building: "Main Building", 
        floor: selectedFloor, 
        room: newLocation 
      });
    }
  };

  const handleRoomClick = (roomKey: string) => {
    setShowRoomImage(roomKey);
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const navItems = [
    { label: "DASHBOARD", icon: Home, path: "/", active: false },
    { label: "GUIDE MAP", icon: Map, path: "/guide-map", active: true },
    { label: "ABOUT US", icon: Info, path: "/about-us", active: false },
    { label: "HELP", icon: HelpCircle, path: "/help", active: false }
  ];

  const floors = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "15", "16"];

  if (isLoading || !isAuthenticated) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="guide-map-layout">
      {/* Header */}
      <div className="guide-map-header">
        <div className="flex items-center space-x-4">
          <div className="university-logo w-10 h-10"></div>
          <span className="text-xl font-bold">FEU TECH</span>
        </div>
        <h1 className="text-2xl font-bold">GUIDE MAP</h1>
        <Button 
          onClick={handleLogout}
          variant="ghost" 
          className="text-white hover:bg-feu-green-dark underline"
        >
          LOGOUT
        </Button>
      </div>

      {/* Sidebar */}
      <div className="guide-map-sidebar">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <nav className="space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => window.location.href = item.path}
                className={`w-full text-left py-3 px-0 font-medium border-b-2 border-dotted border-gray-400 ${
                  item.active ? 'text-feu-green' : 'text-gray-700'
                } hover:text-feu-green transition-colors`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Map Area */}
      <div className="guide-map-main">
        {/* Map Display - FEU Tech Floor Plan */}
        <div className="relative bg-white border-4 border-black rounded-lg p-4 mb-8" style={{ width: '700px', height: '400px' }}>
          <div className="text-center mb-4 text-sm font-bold text-feu-green">EVACUATION FLOOR {selectedFloor}</div>
          
          {/* Top Row Rooms */}
          <div className="absolute top-12 left-8 flex gap-2">
            {/* Diagonal room */}
            <div className="w-16 h-12 border-2 border-black bg-gray-200 transform rotate-45 origin-center cursor-pointer hover:bg-feu-green-light"></div>
            
            <div className="w-16 h-12 border-2 border-black bg-white cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('F601')}>F601</div>
            
            <div className="w-16 h-12 border-2 border-black bg-gray-200 transform rotate-45 origin-center cursor-pointer hover:bg-feu-green-light"></div>
            
            <div className="w-16 h-12 border-2 border-black bg-white cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('F602')}>F602</div>
            
            <div className="w-16 h-12 border-2 border-black bg-white cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('F603')}>F603</div>
            
            <div className="w-16 h-12 border-2 border-black bg-white cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('F604')}>F604</div>
            
            <div className="w-16 h-12 border-2 border-black bg-gray-200 transform rotate-45 origin-center cursor-pointer hover:bg-feu-green-light"></div>
            
            <div className="w-16 h-12 border-2 border-black bg-white cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('F605')}>F605</div>
          </div>
          
          {/* Middle Section */}
          <div className="absolute top-28 left-8 flex gap-2">
            {/* F612 - Large room */}
            <div className="w-20 h-16 border-2 border-black bg-white cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('F612')}>F612</div>
            
            <div className="w-32 h-16 border-2 border-black bg-gray-200 transform rotate-45 origin-center cursor-pointer hover:bg-feu-green-light"></div>
            
            {/* Stairs */}
            <div className="w-20 h-16 border-2 border-black bg-blue-100 cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('STAIRS')}>STAIRS</div>
            
            {/* Fire Exit */}
            <div className="w-20 h-16 border-2 border-red-500 bg-red-100 cursor-pointer hover:bg-red-200 flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('FIRE_EXIT')}>FIRE EXIT 2</div>
          </div>
          
          {/* Bottom Row Rooms */}
          <div className="absolute top-48 left-8 flex gap-2">
            <div className="w-16 h-12 border-2 border-black bg-gray-200 transform rotate-45 origin-center cursor-pointer hover:bg-feu-green-light"></div>
            
            <div className="w-16 h-12 border-2 border-black bg-white cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('F611')}>F611</div>
            
            <div className="w-16 h-12 border-2 border-black bg-white cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('F610')}>F610</div>
            
            <div className="w-16 h-12 border-2 border-black bg-white cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('F609')}>F609</div>
            
            <div className="w-16 h-12 border-2 border-black bg-white cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('F608')}>F608</div>
            
            <div className="w-16 h-12 border-2 border-black bg-white cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('F607')}>F607</div>
            
            <div className="w-16 h-12 border-2 border-black bg-white cursor-pointer hover:bg-feu-green-light flex items-center justify-center text-xs font-bold"
                 onClick={() => handleRoomClick('F606')}>F606</div>
          </div>
          
          {/* Current Location Indicator */}
          <div className="absolute bottom-4 right-4 bg-feu-green text-white px-3 py-1 rounded text-sm font-bold">
            Current: {currentLocation}
          </div>
          
          {/* Floor Title */}
          <div className="absolute bottom-4 left-4 text-feu-green font-bold text-sm">
            Floor {selectedFloor} - FEU Tech
          </div>
        </div>

        {/* Joystick Control */}
        <div className="flex flex-col items-center space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => handleJoystickMove("up")}
          >
            <ChevronUp className="w-6 h-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => handleJoystickMove("left")}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="joystick-container">
              <div className="joystick-handle"></div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => handleJoystickMove("right")}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => handleJoystickMove("down")}
          >
            <ChevronDown className="w-6 h-6" />
          </Button>
          <div className="text-center text-sm font-medium mt-2">
            {currentLocation}
          </div>
        </div>
      </div>

      {/* Floors Panel */}
      <div className="guide-map-floors">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Where do you want to go?</h3>
        </div>
        
        <div className="text-center mb-4">
          <h4 className="text-md font-semibold text-gray-700 underline">FLOORS</h4>
        </div>
        
        <div className="floor-grid">
          {floors.map((floor) => (
            <button
              key={floor}
              className={`floor-button ${selectedFloor === floor ? 'active' : ''}`}
              onClick={() => handleFloorSelect(floor)}
            >
              {floor}
            </button>
          ))}
        </div>
      </div>

      {/* Room Image Modal */}
      {showRoomImage && roomData[showRoomImage as keyof typeof roomData] && (
        <div className="room-image-modal" onClick={() => setShowRoomImage(null)}>
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setShowRoomImage(null)}
            >
              <X className="w-4 h-4" />
            </Button>
            <img
              src={roomData[showRoomImage as keyof typeof roomData].image}
              alt={roomData[showRoomImage as keyof typeof roomData].name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">
              {roomData[showRoomImage as keyof typeof roomData].name}
            </h3>
            <p className="text-gray-600">
              {roomData[showRoomImage as keyof typeof roomData].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}