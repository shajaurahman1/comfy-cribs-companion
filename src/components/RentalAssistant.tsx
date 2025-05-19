
import React, { useState, useEffect } from "react";
import { filterRentals, Rental } from "@/data/rentals";
import ChatInterface from "./ChatInterface";
import RentalCard from "./RentalCard";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const RentalAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Hey there! 🎭 I'm your Funky Homes assistant. What kind of rental are you looking for? Tell me about your dream place!",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [matchedRentals, setMatchedRentals] = useState<Rental[]>([]);
  const [filters, setFilters] = useState<any>({});
  const { toast } = useToast();

  const analyzeMessage = (message: string) => {
    // Very basic filter detection - in a real app, this would be done with NLP
    const newFilters: any = { ...filters };
    
    // Look for bedrooms
    const bedroomMatch = message.match(/(\d+)[\s-]*(bed|bedroom|br)/i);
    if (bedroomMatch) {
      newFilters.bedrooms = parseInt(bedroomMatch[1]);
    }
    
    // Look for beach proximity
    if (/beach|shore|ocean|sea/i.test(message)) {
      newFilters.nearBeach = true;
    }
    
    // Look for pet-friendly
    if (/pet|dog|cat|animal/i.test(message)) {
      newFilters.petFriendly = true;
    }
    
    // Look for parking
    if (/park|parking|garage|car/i.test(message)) {
      newFilters.parking = true;
    }
    
    // Look for budget/price
    const priceMatch = message.match(/(\$|usd|dollar|under|less than|maximum|max|budget)[^\d]*(\d+)/i);
    if (priceMatch) {
      newFilters.maxPrice = parseInt(priceMatch[2]);
    }
    
    return newFilters;
  };

  const handleSendMessage = (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsTyping(true);
    
    // Analyze the message and update filters
    const newFilters = analyzeMessage(messageText);
    setFilters(newFilters);
    
    // Get matching rentals
    const matches = filterRentals(newFilters);
    setMatchedRentals(matches);
    
    // Simulate assistant response time
    setTimeout(() => {
      let responseText = "";
      
      if (matches.length === 0) {
        responseText = "Oh no! 🎪 I couldn't find any rentals that match exactly what you're looking for. Could you be a bit more flexible with your requirements, or would you like me to notify you when something becomes available?";
      } else {
        if (matches.length === 1) {
          responseText = `Tada! 🎭 I found a fantastic place that matches what you're looking for! Check out this ${matches[0].bedrooms}-bedroom gem in ${matches[0].location}. Would you like to know more about it?`;
        } else {
          responseText = `Great news! 🎪 I found ${matches.length} lovely homes that might work for you. ${matches.some(r => r.nearBeach) ? "Some are right by the beach! " : ""}${matches.some(r => r.petFriendly) ? "And yes, your pets are welcome! " : ""}Take a look below and let me know if any catch your eye!`;
        }
      }
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleViewDetails = (rentalId: string) => {
    const rental = matchedRentals.find(r => r.id === rentalId);
    if (rental) {
      toast({
        title: "Property Selected",
        description: `You've selected ${rental.title}. In a full app, this would open detailed view!`,
        duration: 5000,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-1">
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
        />
      </div>
      
      <div className="lg:col-span-2">
        <div className="bg-card rounded-lg border p-4 h-full overflow-y-auto">
          {matchedRentals.length > 0 ? (
            <>
              <h2 className="text-xl font-bold mb-4">
                {matchedRentals.length} {matchedRentals.length === 1 ? 'Home' : 'Homes'} Found 🏠
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedRentals.map((rental) => (
                  <RentalCard
                    key={rental.id}
                    rental={rental}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-lg text-muted-foreground">
                  Your matched properties will appear here
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try asking about beach houses, pet-friendly places, or homes with parking!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalAssistant;
