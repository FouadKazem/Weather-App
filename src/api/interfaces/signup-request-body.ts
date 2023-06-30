import { UUID } from 'crypto'
import LoginRequestBody from './login-request-body'

interface SignupRequestBody extends LoginRequestBody {
    id: UUID,
    firstName: string,
    lastName: string,
}

export default SignupRequestBody