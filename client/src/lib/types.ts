export interface EarlyAccessSignup {
  name: string;
  email: string;
  profession: string;
  terms: boolean;
}

export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface FeatureTab {
  id: string;
  title: string;
  description: string;
}

export interface FeatureContent {
  id: string;
  title: string;
  description: string;
  image: string;
  benefits: string[];
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  icon: string;
}
