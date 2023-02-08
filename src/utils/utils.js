import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();
const isEmailValid = (email)=>{
    return email.includes('@');
}

const createToken = ( payload ) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 60 * 60});
}

const compareToken = ( token ) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}

const encryptPassword = ( password ) => {
    return bcrypt.hashSync(password, 10);
}

const decryptPassword = async ( passwordFromUser, passwordFromDatabase ) => {
    return await bcrypt.compare(passwordFromUser, passwordFromDatabase);
}

const isValidPassword = (password) => {
    if( password.length < 6 ){
        return false
    }
    return true;
}



export {
    isEmailValid,
    encryptPassword,
    decryptPassword,
    createToken,
    compareToken,
    isValidPassword
}