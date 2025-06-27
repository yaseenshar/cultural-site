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
  category?: SiteCategory;
  favourite: boolean;
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}


export type SiteCategory = 'MUSEUM' | 'RESTAURANT' | 'ARTWORK' | 'THEATRE';

export const SITE_CATEGORIES: SiteCategory[] = [
  'MUSEUM',
  'RESTAURANT',
  'ARTWORK',
  'THEATRE'
];

export type GroupedSites = Record<SiteCategory, Site[]>;