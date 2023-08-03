import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/https'

const authApi = {
  logout: () => http.post('/logout'),
  login: (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body),
  registerAccount: (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
}

export default authApi
