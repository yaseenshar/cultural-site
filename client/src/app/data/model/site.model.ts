export interface RawSite {
  id: string;
  dataId: string;
  type: string;
  favourite: boolean;
  properties: string; // JSON string
  geometry: string;   // JSON string
}

export interface Site {
  id: string;
  dataId: string;
  type: string;
  favourite: boolean;
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}