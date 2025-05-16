export interface TimelinePoint {
  id: number;
  data: string;
  rotulo: string;
  imagemUrl: string;
}

export interface TimelineResponse {
  timeline: TimelinePoint[];
} 