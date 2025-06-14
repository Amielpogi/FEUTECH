import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, MessageSquare } from "lucide-react";
import feuLogo from "@assets/images_1749867233732.png";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-feu-light">
      {/* Header */}
      <header className="bg-feu-green text-white shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <img 
              src={feuLogo} 
              alt="FEU Tech Logo" 
              className="w-12 h-12 object-contain"
            />
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">
              FEU TECH CAMPUS NAVIGATION
            </h1>
          </div>
          <Button 
            onClick={handleLogin}
            className="bg-white text-feu-green hover:bg-feu-cream font-medium"
          >
            LOG IN
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="university-logo w-48 h-48 mx-auto mb-8"></div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to FEU Tech
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Navigate our campus with ease using our immersive web-based solution
          </p>
          <Button 
            onClick={handleLogin}
            size="lg"
            className="bg-feu-green hover:bg-feu-green-dark text-white px-8 py-4 text-lg"
          >
            Get Started
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <MapPin className="w-16 h-16 text-feu-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Interactive 2D Maps
              </h3>
              <p className="text-gray-600">
                Explore detailed floor plans of all campus buildings with room-by-room navigation
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 text-feu-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Multi-User Access
              </h3>
              <p className="text-gray-600">
                Designed for students, faculty, staff, and visitors with personalized features
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-16 h-16 text-feu-green-dark mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Feedback System
              </h3>
              <p className="text-gray-600">
                Help us improve the navigation experience with your valuable feedback
              </p>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            About FEU Tech Campus Navigation
          </h3>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our innovative web-based solution enhances the campus experience at FEU Tech in Manila, Philippines. 
            We address the ongoing challenge of navigating the university's complex layout, which includes 
            multiple buildings, interconnected floors, and various departments.
          </p>
        </div>
      </main>
    </div>
  );
}
