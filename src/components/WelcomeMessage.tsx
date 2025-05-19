
import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Sun, Dog, Car } from "lucide-react";

interface WelcomeMessageProps {
  onStartChat: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onStartChat }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-3xl mx-auto animate-message-appear">
      <div className="mb-6">
        <div className="relative">
          <div className="absolute -top-10 -right-6 bg-rental-secondary text-white p-2 rounded-full animate-float">
            <Home size={24} />
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-rental-primary to-rental-secondary text-transparent bg-clip-text mb-2">
            Welcome to HEAVEN HOMES! 🏡
          </div>
        </div>
        <p className="text-xl text-muted-foreground mb-6">
          I'm your friendly neighborhood rental assistant! Let me help you find your perfect temporary palace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full">
        <div className="bg-accent p-6 rounded-2xl flex flex-col items-center">
          <Sun className="h-8 w-8 text-rental-accent mb-3" />
          <h3 className="font-semibold">Beach Getaways</h3>
          <p className="text-sm text-muted-foreground">Sunny spots by the water</p>
        </div>
        
        <div className="bg-accent p-6 rounded-2xl flex flex-col items-center">
          <Dog className="h-8 w-8 text-rental-accent mb-3" />
          <h3 className="font-semibold">Pet-Friendly</h3>
          <p className="text-sm text-muted-foreground">Bring your furry friends</p>
        </div>
        
        <div className="bg-accent p-6 rounded-2xl flex flex-col items-center">
          <Car className="h-8 w-8 text-rental-accent mb-3" />
          <h3 className="font-semibold">Easy Parking</h3>
          <p className="text-sm text-muted-foreground">No more parking wars</p>
        </div>
      </div>

      <Button 
        onClick={onStartChat} 
        className="bg-gradient-to-r from-rental-primary to-rental-secondary hover:opacity-90 transition-all text-white px-8 py-6 text-lg rounded-full"
      >
        Let's Find Your Dream Rental! 🏡
      </Button>
    </div>
  );
};

export default WelcomeMessage;
