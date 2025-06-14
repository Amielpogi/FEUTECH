import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Smartphone, Users, Code, Paintbrush, BarChart } from "lucide-react";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "John Developer",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Jane Designer", 
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Mike Analyst",
      role: "System Analyst", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Sarah Tester",
      role: "QA Engineer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    }
  ];

  const features = [
    {
      icon: <MapPin className="w-12 h-12 text-feu-green" />,
      title: "Interactive 2D Maps",
      description: "Detailed floor plans with room-by-room navigation and real-time location tracking."
    },
    {
      icon: <Search className="w-12 h-12 text-feu-accent" />,
      title: "Smart Search",
      description: "Quickly find classrooms, labs, offices, and facilities with our intelligent search system."
    },
    {
      icon: <Smartphone className="w-12 h-12 text-feu-green-dark" />,
      title: "Mobile Responsive",
      description: "Access navigation tools on any device with our fully responsive web application."
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Image */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="w-full h-64 md:h-80 bg-feu-green flex items-center justify-center">
            <div className="university-logo w-32 h-32"></div>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">About FEU Tech</h1>
              <p className="text-xl md:text-2xl">Leading Innovation in Technology Education</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-feu-gold rounded-xl text-white p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-feu-green mb-6">
            About Online FEU Tech Campus Navigation
          </h2>
          <p className="text-lg leading-relaxed text-feu-green">
            Immersive FEU Tech Campus Navigation is an innovative web-based solution developed to enhance 
            the campus experience for students, faculty, staff, and visitors at FEU Tech in Manila, Philippines. 
            The project addresses the ongoing challenge of navigating the university's complex layout, which 
            includes multiple buildings, interconnected floors, and various departments.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <div className="bg-feu-green rounded-xl text-white p-8">
            <h3 className="text-3xl font-bold text-feu-gold mb-6">Mission</h3>
            <p className="text-lg leading-relaxed">
              Our mission is to develop and maintain a user-friendly web application that offers clear 
              2D floor plans and immersive real-time navigation. We aim to enhance wayfinding for students, 
              faculty, staff, and visitors, reduce time spent locating destinations, and foster a smarter, 
              more connected campus environment.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-feu-green rounded-xl text-white p-8">
            <h3 className="text-3xl font-bold text-feu-gold mb-6">Vision</h3>
            <p className="text-lg leading-relaxed">
              To become the leading digital navigation tool that transforms the campus experience at 
              FEU Tech by making movement within the university seamless, efficient, and accessible 
              for all. We envision a future where every member of the FEU Tech community can confidently 
              explore the campus with ease, supported by intuitive and innovative technology.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <Card>
          <CardContent className="p-8">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Development Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h4 className="font-semibold text-gray-800">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
