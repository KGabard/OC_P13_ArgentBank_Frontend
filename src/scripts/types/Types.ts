export type UserType = {
  email: string
  password: string
  token: {
    status: string
    value: string
  }
  data: {
    status: string
    firstName: string
    lastName: string
  }
}
