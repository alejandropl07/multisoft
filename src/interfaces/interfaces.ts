export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ReviewProps {
  TestimonyKey: number;
  comment: string;
  date: string;
  description: string;
  name: string;
  cargo: string;
  imageUrl?: string; // URL de la imagen existente (opcional)
}

export interface TimelineProps {
  year: string;
  title: string;
  details: string;
}
