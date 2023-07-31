import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/https'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
export const login = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)
export const logout = () => http.post('/logout')
