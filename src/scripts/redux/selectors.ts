import { UserType } from "../types/Types";

export const selectUser = (state: { user: UserType; }) => state.user
