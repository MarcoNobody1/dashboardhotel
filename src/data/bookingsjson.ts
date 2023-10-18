import { BookingInterface } from "../features/Interfaces/Interfaces";

export const bookingsData:BookingInterface[] = [
  {
    guest: {
      nombre: "Bob",
      apellidos: "Smith",
      id_reserva: "98765",
    },
    order_date: "2023-09-27",
    check_in: "2023-11-05",
    check_out: "2023-11-10",
    special_request: "Allergic to pet dander. Please provide hypoallergenic bedding and air purifier. Also, if possible, book a room with an ocean view.",
    room: {
      room_type: "Suite",
      room_number: "205",
      price: Math.floor(Math.random() * (210 - 70 + 1)) + 70,
      amenities: [
        "Free Wi-Fi",
        "Non-smoking room",
        "Ocean view",
      ],
      room_description: "This spacious suite offers a stunning ocean view and comes with complimentary Wi-Fi. It's a non-smoking room to ensure a comfortable stay.",
    },
    status: "Check Out",
  },
  {
    guest: {
      nombre: "Eva",
      apellidos: "Brown",
      id_reserva: "24680",
    },
    order_date: "2023-09-28",
    check_in: "2023-12-20",
    check_out: "2023-12-25",
    special_request: "Late check-out requested due to a late flight. Would like to keep the room until 4 PM. Also, please provide complimentary breakfast in the morning.",
    room: {
      room_type: "Suite",
      room_number: "401",
      price: Math.floor(Math.random() * (210 - 70 + 1)) + 70,
      amenities: [
        "Free Wi-Fi",
        "Non-smoking room",
        "Complimentary breakfast",
      ],
      room_description: "Experience luxury in this Deluxe Suite. Enjoy a comfortable stay with free Wi-Fi and complimentary breakfast. Late check-out available.",
    },
    status: "In Progress",
  },
  {
    guest: {
      nombre: "David",
      apellidos: "Wilson",
      id_reserva: "13579",
    },
    order_date: "2023-09-29",
    check_in: "2023-11-15",
    check_out: "2023-11-20",
    special_request: "Extra pillows and blankets requested for a more comfortable stay.",
    room: {
      room_type: "Single Bed",
      room_number: "112",
      price: Math.floor(Math.random() * (210 - 70 + 1)) + 70,
      amenities: [
        "Free Wi-Fi",
        "Non-smoking room",
      ],
      room_description: "Our Standard Room is perfect for a cozy stay. It comes with free Wi-Fi and a non-smoking environment. Extra pillows and blankets available upon request.",
    },
    status: "Check In",
  },
  {
    guest: {
      nombre: "Grace",
      apellidos: "Johnson",
      id_reserva: "11223",
    },
    order_date: "2023-09-30",
    check_in: "2023-10-08",
    check_out: "2023-10-13",
    special_request: "Room with a view of the garden and a bottle of champagne for our anniversary celebration.",
    room: {
      room_type: "Double Superior",
      room_number: "301",
      price: Math.floor(Math.random() * (210 - 70 + 1)) + 70,
      amenities: [
        "Free Wi-Fi",
        "Ocean view",
      ],
      room_description: "Our Junior Suite offers a picturesque view of the garden. Enjoy your special moments with a bottle of champagne.",
    },
    status: "In Progress",
  },
  {
    guest: {
      nombre: "Michael",
      apellidos: "Davis",
      id_reserva: "56789",
    },
    order_date: "2023-10-01",
    check_in: "2023-11-25",
    check_out: "2023-11-30",
    special_request: "No seafood in meals. Severe seafood allergy. Please ensure no cross-contamination. Additionally, would like access to the pool and gym.",
    room: {
      room_type: "Single Bed",
      room_number: "205",
      price: Math.floor(Math.random() * (210 - 70 + 1)) + 70,
      amenities: [
        "Free Wi-Fi",
        "Non-smoking room",
        "3 bed space",
        "Pool access",
        "Gym access",
      ],
      room_description: "Our Standard Room is equipped with modern amenities, including pool and gym access. We are vigilant about allergies and cross-contamination.",
    },
    status: "Check In",
  },
  {
    guest: {
      nombre: "Sara",
      apellidos: "Johnson",
      id_reserva: "54321",
    },
    order_date: "2023-10-02",
    check_in: "2023-12-05",
    check_out: "2023-12-10",
    special_request: "Early check-in required due to an early morning flight. Arriving at 7 AM. Also, requesting gym access and complimentary breakfast.",
    room: {
      room_type: "Suite",
      room_number: "501",
      price: Math.floor(Math.random() * (210 - 70 + 1)) + 70,
      amenities: [
        "Free Wi-Fi",
        "Non-smoking room",
        "Gym access",
        "Complimentary breakfast",
      ],
      room_description: "Our Deluxe Suite is perfect for early risers. Enjoy your stay with gym access and complimentary breakfast. Early check-in available.",
    },
    status: "Check Out",
  },
  {
    guest: {
      nombre: "Fernanda",
      apellidos: "Gómez",
      id_reserva: "24681",
    },
    order_date: "2023-09-30",
    check_in: "2023-10-05",
    check_out: "2023-10-10",
    special_request: "Late check-in required. Flight arriving at 10 PM. Also, would like access to the pool.",
    room: {
      room_type: "Double Bed",
      room_number: "102",
      price: Math.floor(Math.random() * (210 - 70 + 1)) + 70,
      amenities: [
        "Free Wi-Fi",
        "Non-smoking room",
        "Pool access",
      ],
      room_description: "Our Standard Room is a comfortable choice for late arrivals. Enjoy a refreshing swim with pool access.",
    },
    status: "Check Out",
  },
  {
    guest: {
      nombre: "Carlos",
      apellidos: "López",
      id_reserva: "13580",
    },
    order_date: "2023-10-01",
    check_in: "2023-11-01",
    check_out: "2023-11-06",
    special_request: "Non-smoking room with a view of the city skyline. Also, requesting gym access and complimentary breakfast.",
    room: {
      room_type: "Suite",
      room_number: "206",
      price: Math.floor(Math.random() * (210 - 70 + 1)) + 70,
      amenities: [
        "Free Wi-Fi",
        "Non-smoking room",
        "Gym access",
        "Complimentary breakfast",
      ],
      room_description: "Enjoy a smoke-free environment with a breathtaking city skyline view. Access our gym and enjoy a complimentary breakfast during your stay.",
    },
    status: "In Progress",
  },
];






