export type Service = {
  id?: number;
  subdomain: string;
  domain?: string;
  active?: boolean;
  isConfigured?: boolean;
  userId?: number;
  isInitialized?: boolean;
  isSSL?: boolean;
}

type AutoCenter = {
  name: string;
  phone: number;
  address: string;
  email: string;
  timezone: string;
}

type Consultant = {
  name: string;
  male: number;
  photo: Blob;
  description: string;
}

export type AppConfig = {
  id?: number;
  name: string;
  title: string;
  type: number;
  brand: number;
  description: string;
  personalPolice: string; 
  url: string;
  autoCenter: AutoCenter;
  consultant: Consultant;
}