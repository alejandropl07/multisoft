export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ReviewProps {
  id: number;
  name: string;
  date: string;
  description: string;
  delayAnimation: string;
  rating: number
}


export interface TimelineProps {
  year: string;
  title: string;
  details: string;
}