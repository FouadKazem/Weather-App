import jwt from 'jsonwebtoken'

const signVerifyOptions: jwt.SignOptions | jwt.VerifyOptions = {
    expiresIn: '30d',
}

export default signVerifyOptions