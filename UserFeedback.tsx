import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Star, 
  Bug, 
  Lightbulb, 
  TrendingUp, 
  MessageCircle,
  Send
} from "lucide-react";

const feedbackSchema = z.object({
  rating: z.number().min(1, "Please provide a rating").max(5),
  category: z.string().min(1, "Please select a feedback category"),
  message: z.string().min(10, "Please provide more detailed feedback"),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactName: z.string().optional(),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export default function UserFeedback() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      category: "",
      message: "",
      contactEmail: "",
      contactName: "",
    },
  });

  const { data: userFeedback } = useQuery({
    queryKey: ["/api/feedback/user"],
    enabled: isAuthenticated,
  });

  const submitFeedbackMutation = useMutation({
    mutationFn: async (data: FeedbackFormData) => {
      await apiRequest("POST", "/api/feedback", data);
    },
    onSuccess: () => {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We will review it and get back to you.",
      });
      form.reset();
      setSelectedRating(0);
      setSelectedCategory("");
      queryClient.invalidateQueries({ queryKey: ["/api/feedback/user"] });
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
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    },
  });

  const categories = [
    {
      id: "bug",
      label: "Bug Report",
      icon: <Bug className="w-6 h-6" />,
      description: "Report a technical issue"
    },
    {
      id: "feature",
      label: "Feature Request",
      icon: <Lightbulb className="w-6 h-6" />,
      description: "Suggest a new feature"
    },
    {
      id: "improvement",
      label: "Improvement",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Suggest improvements"
    },
    {
      id: "general",
      label: "General Feedback",
      icon: <MessageCircle className="w-6 h-6" />,
      description: "General comments"
    }
  ];

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    form.setValue("rating", rating);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    form.setValue("category", category);
  };

  const onSubmit = (data: FeedbackFormData) => {
    submitFeedbackMutation.mutate(data);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case "under_review":
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading || !isAuthenticated) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-feu-green rounded-xl text-white p-8 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">User Feedback</h2>
            <p className="text-feu-gold text-lg mb-6">Help us improve our services</p>
            
            {/* Star Rating */}
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= selectedRating 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-white hover:text-yellow-300"
                  }`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
            <p className="text-sm opacity-90">Rate your overall experience</p>
          </div>
        </div>

        {/* Feedback Form */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Feedback Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-800">
                        Select feedback category
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {categories.map((category) => (
                            <Button
                              key={category.id}
                              type="button"
                              variant="outline"
                              className={`h-auto p-4 flex flex-col items-center text-center transition-all ${
                                selectedCategory === category.id
                                  ? "border-feu-green bg-feu-green text-white hover:bg-feu-green hover:text-white"
                                  : "hover:border-feu-green hover:bg-feu-green hover:text-white"
                              }`}
                              onClick={() => handleCategorySelect(category.id)}
                            >
                              {category.icon}
                              <span className="text-sm font-medium mt-2">
                                {category.label}
                              </span>
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Feedback Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-800">
                        Your Feedback:
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your feedback here..."
                          className="resize-none"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-gray-500">
                        Please provide detailed information to help us understand your feedback better.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@feu.edu.ph"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={submitFeedbackMutation.isPending}
                    className="bg-feu-green hover:bg-feu-green-dark text-white px-8 py-3"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {submitFeedbackMutation.isPending ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Your Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            {userFeedback && userFeedback.length > 0 ? (
              <div className="space-y-4">
                {userFeedback.map((feedback: any) => (
                  <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="capitalize">
                        {feedback.category.replace('_', ' ')}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formatDate(feedback.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{feedback.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= feedback.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">
                          {feedback.rating}/5
                        </span>
                      </div>
                      {getStatusBadge(feedback.status)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No feedback submitted yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
