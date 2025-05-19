
export type Rental = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  petFriendly: boolean;
  parking: boolean;
  nearBeach: boolean;
  availableFrom: string;
  amenities: string[];
  images: string[];
};

export const rentalListings: Rental[] = [
  {
    id: "r1",
    title: "Sunny Beach Cottage",
    description: "A charming cottage just steps from the beach with amazing sunset views!",
    price: 2200,
    location: "Sunny Shore Beach, FL",
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 950,
    petFriendly: true,
    parking: true,
    nearBeach: true,
    availableFrom: "2025-06-01",
    amenities: ["Sea view", "Private patio", "Outdoor shower", "Wifi", "Fully equipped kitchen"],
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-4.0.3",
    ],
  },
  {
    id: "r2",
    title: "Modern Beachside Apartment",
    description: "Sleek, modern apartment with direct beach access and resort-style pool.",
    price: 2800,
    location: "Palm Beach, CA",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1100,
    petFriendly: true,
    parking: true,
    nearBeach: true,
    availableFrom: "2025-05-15",
    amenities: ["Pool access", "Gym", "Gated community", "Beach access", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
    ],
  },
  {
    id: "r3",
    title: "Cozy Beach Bungalow",
    description: "Adorable beach bungalow with plenty of character and a short walk to the shore.",
    price: 1950,
    location: "Wave Crest, OR",
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 875,
    petFriendly: true,
    parking: true,
    nearBeach: true,
    availableFrom: "2025-06-10",
    amenities: ["Fire pit", "Garden", "BBQ area", "Outdoor dining", "Laundry"],
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
    ],
  },
  {
    id: "r4",
    title: "Luxury Downtown Loft",
    description: "Stunning modern loft in the heart of downtown with high-end finishes.",
    price: 3200,
    location: "Downtown, NY",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    petFriendly: false,
    parking: true,
    nearBeach: false,
    availableFrom: "2025-05-01",
    amenities: ["Floor-to-ceiling windows", "Rooftop access", "Smart home features", "Concierge", "Home office nook"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
    ],
  },
  {
    id: "r5",
    title: "Mountain View Cabin",
    description: "Rustic yet modern cabin with breathtaking mountain views and hiking trails nearby.",
    price: 1800,
    location: "Pine Ridge, CO",
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 900,
    petFriendly: true,
    parking: true,
    nearBeach: false,
    availableFrom: "2025-07-01",
    amenities: ["Hot tub", "Wood fireplace", "Deck", "Hiking trails", "Stargazing spot"],
    images: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3",
    ],
  },
];

export function filterRentals(filters: Partial<{
  bedrooms: number;
  nearBeach: boolean;
  petFriendly: boolean;
  parking: boolean;
  maxPrice: number;
  availableFrom: string;
}>): Rental[] {
  return rentalListings.filter(rental => {
    // Check bedrooms
    if (filters.bedrooms !== undefined && rental.bedrooms < filters.bedrooms) {
      return false;
    }
    
    // Check beach proximity
    if (filters.nearBeach && !rental.nearBeach) {
      return false;
    }
    
    // Check pet-friendliness
    if (filters.petFriendly && !rental.petFriendly) {
      return false;
    }
    
    // Check parking
    if (filters.parking && !rental.parking) {
      return false;
    }
    
    // Check price
    if (filters.maxPrice !== undefined && rental.price > filters.maxPrice) {
      return false;
    }
    
    // Check availability date
    if (filters.availableFrom !== undefined && 
        new Date(rental.availableFrom) > new Date(filters.availableFrom)) {
      return false;
    }
    
    return true;
  });
}
