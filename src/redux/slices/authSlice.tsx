import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../root/root-state.interface";
import axiosApiInstance from "../../axios/axiosinstance";

export const AUTH_SLICE_KEY = "authSlice";

interface Messages {
  messageKy: string;
  messageRu: string;
}

export interface User {
  id: number;
  login: string | null;
  password: string | null;
  name: string | null;
  secondName: string;
  // Добавьте другие поля по необходимости
}

export interface AuthState {
  isLoggedIn: boolean;
  hasValidToken: boolean;
  user: User | null;
  errorMessage: string;
  requiresPasswordChange: boolean;
}

const initialState: AuthState = {
  hasValidToken: false,
  isLoggedIn: false,
  user: null,
  errorMessage: "",
  requiresPasswordChange: false
};

interface IAuthResponse {
  success: boolean;
  message: Messages;
  error: string;
  result: ITokens | IBlockedInfo;
  time: Date;
  ver: string;
}

interface IBlockedInfo {
  blockedTime: Date;
  blockedReason: string;
}

interface ITokens {
  token: string;
  requiresPasswordChange: boolean;
}

interface IAuthParams {
  username: string;
  password: string;
}

interface ILanguageParams {
  userId: number;
  langId: number;
}

export class AuthSliceMethods {
  static errorMessage: string = "";
  static getUserInfoStatus: boolean = true;

  static login = createAsyncThunk(
    "auth/login",
    async (params: IAuthParams): Promise<any> => {
      try {
        const res = await axiosApiInstance.post<any>(
          `api/v1/auth/login`,
          { username: params.username, password: params.password },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
          }
        );
        
        if (res.data.error && res.data.error.toLowerCase() === 'unauthorized') {
          this.getUserInfoStatus = false;
        } else {
          this.getUserInfoStatus = true;
        }
        
        return res.data;
      } catch (ex: any) {
        if (ex.response?.data) {
          const errorData = ex.response.data;
          
          if (errorData.message && typeof errorData.message === 'string') {
            if (errorData.message.toLowerCase() === 'user is blocked') {
              this.errorMessage = `Пользователь заблокирован по причине: ${errorData.result?.blockedReason} ${new Date(errorData.result?.blockedTime).toLocaleString('ru-RU', {day: '2-digit', month: '2-digit', year: 'numeric'})}`;
            } else if (errorData.message.toLowerCase() === 'does not exists') {
              this.errorMessage = 'Пользователь не найден';
            } else {
              this.errorMessage = errorData.message;
            }
          } else if (errorData.message && typeof errorData.message === 'object') {
            this.errorMessage = `${errorData.message.messageKy || ''}/${errorData.message.messageRu || ''}`;
          } else {
            this.errorMessage = ex.message || 'Произошла ошибка при авторизации';
          }
        } else {
          this.errorMessage = ex.message || 'Произошла ошибка при авторизации';
        }
        
        this.getUserInfoStatus = false;
        return Promise.reject(ex);
      }
    }
  );

  static logout = createAsyncThunk("auth/logout", async () => {
    try {
      this.getUserInfoStatus = false;
      //var res = await axiosApiInstance.post("ap/logout");
    } catch (ex: any) {}
  });

  static getUserInfo = createAsyncThunk(
    "auth/getUserInfo",
    async (): Promise<User> => {
      try {
        if (this.getUserInfoStatus) {
          const res = await axiosApiInstance.get(`ap/get-mine`);
          //i18next.changeLanguage(res.data.result.langId.alias);
          return res.data.result as User;
        }
        return {} as User;
      } catch (ex: any) {
        throw ex;
      }
    }
  );

  static setLanguage = createAsyncThunk(
    "auth/setLanguage",
    async (params: ILanguageParams): Promise<User> => {
      try {
        if (this.getUserInfoStatus) {
          const res = await axiosApiInstance.post(`ap/user-set-lang?userId=${params.userId}&langId=${params.langId}`);
          return res.data.result as User;
        }
        return {} as User;
      } catch (ex: any) {
        throw ex;
      }
    }
  );
}

export const authSlice = createSlice({
  name: AUTH_SLICE_KEY,
  initialState,
  reducers: {
    clearAuthCredentials: (state) => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenRefreshing");
      state.user = null;
      state.isLoggedIn = false;
      state.hasValidToken = false;
      state.requiresPasswordChange = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthSliceMethods.login.fulfilled, (state, action) => {
        if (action.payload.error && action.payload.error.toLowerCase() === 'unauthorized') {
          state.errorMessage = 'Проверьте правильность введенного пароля';
        } else {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", action.payload.token);
          state.user = null;
          state.isLoggedIn = true;
          state.hasValidToken = true;
          state.requiresPasswordChange = action.payload.requiresPasswordChange || false;
          state.errorMessage = "";
        }
      })
      .addCase(AuthSliceMethods.login.rejected, (state, action) => {
        authSlice.actions.clearAuthCredentials();
        state.errorMessage = AuthSliceMethods.errorMessage;
      })
      .addCase(AuthSliceMethods.logout.fulfilled, (state) => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        state.user = null;
        state.isLoggedIn = false;
        state.requiresPasswordChange = false;
        state.errorMessage = '';
      })
      .addCase(AuthSliceMethods.getUserInfo.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.hasValidToken = true;
      })
      .addCase(AuthSliceMethods.getUserInfo.rejected, (state, action) => {
        authSlice.actions.clearAuthCredentials();
      })
      .addCase(AuthSliceMethods.setLanguage.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.hasValidToken = true;
      })
      .addCase(AuthSliceMethods.setLanguage.rejected, (state, action) => {
        authSlice.actions.clearAuthCredentials();
        state.errorMessage = AuthSliceMethods.errorMessage;
      });
  },
});

export const getAuthState = (rootState: RootState): AuthState =>
  rootState[AUTH_SLICE_KEY];