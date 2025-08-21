
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../root/root-state.interface";
import axiosApiInstance from "../../axios/axiosinstance";
import { User } from "../../models/user";

export const AUTH_SLICE_KEY = "authSlice";
interface Messages {
  messageKy: string;
  messageRu: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  hasValidToken: boolean;
  user: User;
  errorMessage: string;
}

const initialState = {
  hasValidToken: false,
  isLoggedIn: false,
  user: {} as User,
  errorMessage: ""
} as AuthState;

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
  accessToken: string;
  refreshToken: string;
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
    async (params: IAuthParams): Promise<IAuthResponse> => {
      try {
     
        var res = await axiosApiInstance.post<IAuthResponse>(
          `ap/login`,
          { username: params.username, password: params.password },
          
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
          }
        );
        if(res.data.error.toLowerCase() ==='unauthorized'){
          this.getUserInfoStatus = false;
        }else{
          this.getUserInfoStatus = true;
        }
        
        return res.data;
      } catch (ex: any) {
        this.errorMessage = `${ex.response.data.message.messageKy}/${ex.response.data.message.messageRu}`;
        if(ex.response.data.message.toLowerCase() === 'user is blocked'){
          this.errorMessage = `Ползователь заблокирован по причине: ${ex.response.data.result.blockedReason} ${new Date(ex.response.data.result.blockedTime).toLocaleString('ru-RU', {day: '2-digit', month: '2-digit', year: 'numeric'})}`;
        }else if(ex.response.data.message.toLowerCase() === 'does not exists'){
          this.errorMessage = 'Ползователь не найден';
        }else{
          this.errorMessage = `${ex.response.data.message.messageKy}/${ex.response.data.message.messageRu}`;
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
        if(this.getUserInfoStatus){
          var res = await axiosApiInstance.get(`ap/get-mine`);
          //i18next.changeLanguage(res.data.result.langId.alias);
          return res.data.result;
        }
        return new User();
      } catch (ex: any) {
        throw ex;
      }
    }
  );

  static setLanguage = createAsyncThunk(
    "auth/setLanguage",
    async (params: ILanguageParams): Promise<User> => {
      try {
        if(this.getUserInfoStatus){
          var res = await axiosApiInstance.post(`ap/user-set-lang?userId=${params.userId}&langId=${params.langId}`);
          return res.data.result;
        }
        return new User();
      } catch (ex: any) {
        throw ex;
      }
    }
  )
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
      state.user = {} as User;
      state.isLoggedIn = false;
      state.hasValidToken = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthSliceMethods.login.fulfilled, (state, action) => {
        if(action.payload.error.toLowerCase() === 'unauthorized'){
          state.errorMessage = 'Проверьте правильность введенного пароля';
        }else{
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", (action.payload.result as ITokens).accessToken);
          localStorage.setItem("refreshToken", (action.payload.result as ITokens).refreshToken);
          state.user = new User();
          state.isLoggedIn = true;
          state.hasValidToken = true;
        }
      })
      .addCase(AuthSliceMethods.logout.fulfilled, (state) => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        state.user = {} as User;
        state.isLoggedIn = false;
      
        state.errorMessage = '';
      })
      .addCase(AuthSliceMethods.getUserInfo.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload ?? new User();
        state.hasValidToken = true;
      })
      .addCase(AuthSliceMethods.getUserInfo.rejected, (state, action) => {
        authSlice.actions.clearAuthCredentials();
      })
      .addCase(AuthSliceMethods.login.rejected, (state, action) => {
        authSlice.actions.clearAuthCredentials();
        state.errorMessage = AuthSliceMethods.errorMessage;
      })
      .addCase(AuthSliceMethods.setLanguage.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.hasValidToken = true;
      })
      .addCase(AuthSliceMethods.setLanguage.rejected, (state, action) => {
        authSlice.actions.clearAuthCredentials();
        state.errorMessage = AuthSliceMethods.errorMessage;
      })
  },
});

export const getAuthState = (rootState: RootState): AuthState =>
  rootState[AUTH_SLICE_KEY];
