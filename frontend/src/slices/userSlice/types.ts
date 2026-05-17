export type User = {
  access_token: string;
  token_type: string;
};

export type UserSchema = {
  inited: boolean;
  authData: User | null;
  authDataLoading: boolean;
  authDataError: string | null;
};
