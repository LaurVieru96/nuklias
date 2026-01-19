import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import WhatWeSolve from "@/pages/WhatWeSolve";
import Products from "@/pages/Products";
import Process from "@/pages/Process";
import ContactUs from "@/pages/ContactUs";
import { ThemeToggle } from "@/components/ThemeToggle";

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
        <ThemeToggle />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
