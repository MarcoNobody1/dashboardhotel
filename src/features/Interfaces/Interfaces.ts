export interface BookingInterface {
  guest: {
    nombre: string;
    apellidos: string;
    id_reserva: string;
  };
  order_date: string;
  check_in: string;
  check_out: string;
  special_request: string;
  room: {
    room_type: string;
    room_number: string;
    price: number;
    amenities: string[];
    room_description: string;
  };
  status: string;
}

export interface ContactInterface {
  date: {
    id: string;
    send_date: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  subject: string;
  comment: string;
  archived: boolean;
}

export interface RoomInterface {
  room_name: {
    id: string;
    room_photo: string;
    room_number: number;
    room_description: string;
  };
  room_type: string;
  amenities: string[];
  price: number;
  offer_price: {
    isOffer: boolean;
    discount: number;
  };
  availability: string;
}

export interface UserInterface {
  name: {
    photo: string;
    username: string;
    id: string;
    employee_position: string;
    email: string;
    password_hash: string;
  };
  start_date: string;
  job_description: string;
  contact: string;
  status: string;
}
