export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  fullName: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
}

export interface SendConfirmationCodeRequest {
  email: string;
}

export interface VerifyConfirmationCodeRequest {
  email: string;
  code: string;
}
