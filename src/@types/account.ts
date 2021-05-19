// ----------------------------------------------------------------------

export type User = {
  id: string;
  displayName: string;
  email: string;
  password: string;
  photoURL: string | null;
  phoneNumber: string | null;
  country: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  about: string | null;
  role: string;
  isPublic: boolean;
  // database value

  userName: string;
  access_token: string;
  token_type: string;
  expires_in: string;
  issued: string;
  expires: string;
};
