export interface RawSite {
  siteId: string;
  id: string;
  type: string;
  favourite: boolean;
  properties: any; // JSON string
  geometry: any;   // JSON string
}

export interface Site {
  siteId: string;
  id: string;
  type: string;
  favourite: boolean;
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}