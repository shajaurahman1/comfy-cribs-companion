
import React, { useState } from "react";
import WelcomeMessage from "@/components/WelcomeMessage";
import RentalAssistant from "@/components/RentalAssistant";

const Index = () => {
  const [chatStarted, setChatStarted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-rental-primary to-rental-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                F
              </div>
              <span className="font-bold text-xl">Funky Homes</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 py-8">
        {!chatStarted ? (
          <WelcomeMessage onStartChat={() => setChatStarted(true)} />
        ) : (
          <div className="h-[calc(100vh-12rem)]">
            <RentalAssistant />
          </div>
        )}
      </main>

      <footer className="mt-auto border-t">
        <div className="container mx-auto p-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Funky Homes - Your rental assistant with pizzazz! 🎭</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
