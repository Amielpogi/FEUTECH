import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Account from "@/pages/Account";
import GuideMap from "@/pages/GuideMap";
import UserFeedback from "@/pages/UserFeedback";
import AboutUs from "@/pages/AboutUs";
import Help from "@/pages/Help";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <Layout>
          <Route path="/" component={Home} />
          <Route path="/account" component={Account} />
          <Route path="/guide-map" component={GuideMap} />
          <Route path="/user-feedback" component={UserFeedback} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/help" component={Help} />
        </Layout>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
