import jwt from 'jsonwebtoken'
export async function createToken(userId:string){
    return jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn: '365d'})
}