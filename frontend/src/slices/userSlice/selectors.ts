import type { RootState } from '../../store';

export const getUserAuthData = (state: RootState) => state.user.authData;
export const getUserInited = (state: RootState) => state.user.inited;
