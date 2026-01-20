import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound/NotFound";
import Home from "@/pages/Home/Home";
import WhatWeSolve from "@/pages/WhatWeSolve/WhatWeSolve";
import Products from "@/pages/Products/Products";
import Process from "@/pages/Process/Process";
import ContactUs from "@/pages/ContactUs/ContactUs";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { ScrollToTop } from "@/components/ScrollToTop/ScrollToTop";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { CookieConsent } from "@/components/CookieConsent/CookieConsent";
import "./lib/i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/what-we-solve" component={WhatWeSolve} />
      <Route path="/products" component={Products} />
      <Route path="/process" component={Process} />
      <Route path="/contact" component={ContactUs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <ScrollToTop />
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <CookieConsent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
