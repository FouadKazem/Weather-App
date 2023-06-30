import { UUID } from "crypto"

interface SignupRequestBody {
    id: UUID,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export default SignupRequestBody