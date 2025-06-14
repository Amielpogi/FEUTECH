import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  Clock, 
  MessageCircle, 
  Download, 
  Play 
} from "lucide-react";

export default function Help() {
  const [, setLocation] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I navigate to a specific room?",
      answer: "Use the search function in the Guide Map section to find your desired room. You can search by room number, building name, or facility type. The interactive map will highlight the location and provide step-by-step directions."
    },
    {
      question: "Can I use this on my mobile device?",
      answer: "Yes! Our campus navigation system is fully responsive and works on all devices including smartphones, tablets, and desktop computers. The mobile version includes touch-friendly navigation controls."
    },
    {
      question: "How do I report a problem or bug?",
      answer: "Visit the User Feedback section and select \"Bug Report\" as your feedback category. Provide detailed information about the issue you encountered, including what you were trying to do and any error messages you saw."
    },
    {
      question: "Is my location data private?",
      answer: "Yes, we take your privacy seriously. Location data is only used to provide navigation assistance and is not stored or shared with third parties. You can disable location services in your account settings at any time."
    },
    {
      question: "How often are the maps updated?",
      answer: "Our maps are updated regularly to reflect any changes in room assignments, building layouts, or new facilities. We aim to update the maps at least once per semester or whenever significant changes occur."
    },
    {
      question: "Can I save favorite locations?",
      answer: "Currently, the system doesn't support saving favorite locations, but this feature is planned for a future update. You can submit a feature request through our feedback system."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Help & Support</h2>

        {/* Search Help */}
        <div className="mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <Button
                    variant="ghost"
                    className="w-full text-left p-4 hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                  {openFaq === index && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
              {filteredFaqs.length === 0 && searchQuery && (
                <div className="text-center py-8 text-gray-500">
                  <p>No help topics found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact and Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-feu-green mr-3" />
                  <span className="text-gray-700">support@feutech.edu.ph</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-feu-green mr-3" />
                  <span className="text-gray-700">+63 2 8281 8888</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-feu-green mr-3" />
                  <span className="text-gray-700">Mon-Fri: 8:00 AM - 5:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  className="w-full justify-start bg-feu-green hover:bg-feu-green-dark text-white"
                  onClick={() => setLocation("/user-feedback")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-feu-accent text-feu-accent hover:bg-feu-accent hover:text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download User Guide
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Tutorial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">User Manual</h4>
                <p className="text-sm text-gray-600 mb-3">Comprehensive guide to using the navigation system</p>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Video Tutorials</h4>
                <p className="text-sm text-gray-600 mb-3">Step-by-step video guides for common tasks</p>
                <Button variant="outline" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Videos
                </Button>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Campus Map</h4>
                <p className="text-sm text-gray-600 mb-3">Interactive campus map with all buildings</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setLocation("/guide-map")}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Open Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
