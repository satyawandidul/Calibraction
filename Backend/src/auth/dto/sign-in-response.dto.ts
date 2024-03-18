import { User } from "src/user/entities/user.entity";

export class SignInResponse {
    user: User
    token: string
}