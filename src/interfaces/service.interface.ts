export interface Service {
    id?: number;
    domain: string;
    active?: boolean;
    isConfigured?: boolean;
    userId?: number;
    isInitialized?: boolean;
    isSSL?: boolean;
  }