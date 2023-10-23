export interface roomAmenitiesInterface {
  Standard: string[];
  Advanced: string[];
  Premium: string[];
  FullRoom: string[];
}

export const roomAmenities: roomAmenitiesInterface = {
  Standard: [
    "1/3 Bed Space",
    "Air Conditioner",
    "Television",
    "Towels",
    "Coffee Set",
  ],
  Advanced: [
    "1/2 Bathroom",
    "Free Wifi",
    "Air Conditioner",
    "Television",
    "Towels",
    "Mini Bar",
    "Coffee Set",
  ],
  Premium: [
    "1/3 Bed Space",
    "24-Hour Guard",
    "Free Wifi",
    "Air Conditioner",
    "Television",
    "Towels",
    "Mini Bar",
    "Coffee Set",
    "Nice Views",
  ],
  FullRoom: [
    "1/3 Bed Space",
    "24-Hour Guard",
    "Free Wifi",
    "Air Conditioner",
    "Television",
    "Towels",
    "Mini Bar",
    "Coffee Set",
    "Bathtub",
    "Jacuzzi",
    "Nice Views",
  ],
};
