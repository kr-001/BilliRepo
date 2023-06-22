export interface User {
    id: number;
    fullName: string;
    email: string;
    mobile : string;
    location : Location
    // Add other properties as needed
  }
  
  export interface Location {
    city: string;
    country: string;
    // Add other properties as needed
  }