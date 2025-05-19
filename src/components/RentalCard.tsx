
import React from "react";
import { Rental } from "@/data/rentals";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Home, Bath, Ruler, PawPrint, Car, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RentalCardProps {
  rental: Rental;
  onViewDetails: (rentalId: string) => void;
}

const RentalCard: React.FC<RentalCardProps> = ({ rental, onViewDetails }) => {
  return (
    <Card className="overflow-hidden border-2 hover:border-rental-primary transition-all duration-300 animate-message-appear">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={rental.images[0]} 
          alt={rental.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white/80 hover:bg-white"
          >
            <Heart className="h-5 w-5 text-rental-secondary" />
          </Button>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-rental-primary hover:bg-rental-primary text-white">
            ${rental.price}/month
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-1 text-rental-dark">{rental.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{rental.location}</p>
        
        <div className="flex flex-wrap gap-3 mb-3">
          <div className="flex items-center text-sm">
            <Home className="h-4 w-4 mr-1 text-rental-primary" />
            <span>{rental.bedrooms} {rental.bedrooms === 1 ? 'bed' : 'beds'}</span>
          </div>
          <div className="flex items-center text-sm">
            <Bath className="h-4 w-4 mr-1 text-rental-primary" />
            <span>{rental.bathrooms} {rental.bathrooms === 1 ? 'bath' : 'baths'}</span>
          </div>
          <div className="flex items-center text-sm">
            <Ruler className="h-4 w-4 mr-1 text-rental-primary" />
            <span>{rental.squareFeet} sq ft</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {rental.petFriendly && (
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              <PawPrint className="h-3 w-3" />
              Pet-friendly
            </Badge>
          )}
          {rental.parking && (
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              <Car className="h-3 w-3" />
              Parking
            </Badge>
          )}
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            <CalendarDays className="h-3 w-3" />
            Available {new Date(rental.availableFrom).toLocaleDateString()}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onViewDetails(rental.id)} 
          className="w-full bg-rental-primary hover:bg-rental-dark"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RentalCard;
