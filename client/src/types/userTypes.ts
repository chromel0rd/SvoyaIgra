export type UserType = {
    id: number;
    name: string;
    email: string;
  };
  
  export type ApiResponseType = {
    accessToken: string;
    user: UserType;
  };
  
  export type UserSignUpType = {
    name: string;
    email: string;
    password: string;
  };
  
  export type UserLoginType = Omit<UserSignUpType, 'username'>;
  
  export type UserState =
    | { status: 'pending' }
    | { status: 'guest' }
    | ({ status: 'logged' } & UserType);
  