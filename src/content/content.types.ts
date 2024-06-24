export interface Upgrade {
  id: string;
  name: string;
  description: string;
  image: string;

  price: (level: number) => number;
  kps: (level: number) => number;
  effects?: (level: number) => void;

  parent_upgrade?: string;
}

export interface AudioTrack {
  name: string;
  artist: string;
  file: string;
}