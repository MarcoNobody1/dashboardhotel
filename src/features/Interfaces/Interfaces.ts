export interface BookingInterface {
  _id: {
    $oid: String;
  };
  name: string;
  surname: string;
  order_date: string;
  check_in: string;
  check_out: string;
  special_request: string;
  room_id: any;
  room_type: string;
  room_number: string;
  room_amenities: string[];
  room_description: string;
  price: number;
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
  _id: {
    $oid: String;
  };
  photos: string;
  number: number;
  description: string;
  type: string;
  amenities: string[];
  price: number;
  discount: number;
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
  activity: string;
}

export interface DarkProp {
  dark?: boolean | string;
}
