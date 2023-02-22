export type UserType = {
  email: string
  password: string
  connection: {
    status: 'void' | 'pending' | 'updating' | 'resolved' | 'rejected'
    error: string
    token: string
    isConnected: boolean
  }
  userData: {
    status: 'void' | 'pending' | 'updating' | 'resolved' | 'rejected'
    error: string
    firstName: string
    lastName: string
  }
}

export type EditUserType = {
  status: string
  error: string
}
