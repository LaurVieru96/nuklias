import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound/NotFound";
import Home from "@/pages/Home/Home";
import WhatWeSolve from "@/pages/WhatWeSolve/WhatWeSolve";
import Products from "@/pages/Products/Products";
import Process from "@/pages/Process/Process";
import ContactUs from "@/pages/ContactUs/ContactUs";
import Login from "@/pages/Login/Login";
import DashboardHome from "@/pages/DashboardHome/DashboardHome";
// import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { ScrollToTop } from "@/components/ScrollToTop/ScrollToTop";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { CookieConsent } from "@/components/CookieConsent/CookieConsent";
import "./lib/i18n";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/what-we-solve" component={WhatWeSolve} />
      <Route path="/products" component={Products} />
      <Route path="/process" component={Process} />
      <Route path="/contact" component={ContactUs} />
      
      {/* Auth Routes */}
      <Route path="/login" component={Login} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard">
        <ProtectedRoute>
          <DashboardHome />
        </ProtectedRoute>
      </Route>
      
      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Router />
          <ScrollToTop />
          <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
            <LanguageSwitcher />

            {/* Removed for the moment */}
            {/* <ThemeToggle /> */}
          </div>
          <CookieConsent />
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
