export interface Ride {
  id: string;
  type: 'driver' | 'passenger';
  from: string;
  to: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  user: {
    name: string;
    avatar: string;
    phone: string;
  };
  description?: string;
  createdAt: number;
}
