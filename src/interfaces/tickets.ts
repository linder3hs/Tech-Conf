interface IEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  capacity: number;
  created_at: string;
}

export interface ITickets {
  id: number;
  user_id: string;
  created_at: string;
  events: IEvent;
}
