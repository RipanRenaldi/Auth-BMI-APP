import User_Auth from '../model/UserAuth.js';
import { isEmailValid, encryptPassword, isValidPassword, createToken, decryptPassword} from '../utils/utils.js';
import dotenv from "dotenv";
import { QueryTypes } from 'sequelize';
const { sequelize } = User_Auth;
dotenv.config();
const createUser = async ( req, res ) => {
    try{
        const {id, username, email, password} = req.body;
        if( !isEmailValid(email) ) {
            throw new Error('Email Invalid');
        }
        if ( !username || !email || !password || !id ) {
            throw new Error('Username, Email, or Password is Empty');
        }
        if( !isValidPassword(password) ){
            throw new Error('Password Length Minimum Six Character');
        }
        const checkUserExist = await sequelize.query(`SELECT ( email ) FROM users WHERE email='${email}'`,{type: QueryTypes.SELECT});
        if( checkUserExist ){
            throw new Error('Email is Already Exist');
        }
        const passwordEncrypted = encryptPassword(password);
        const newUser = await User_Auth.create( {id, username, email, password: passwordEncrypted} );
        if( !newUser ){
            throw new Error('Cant create user');
        }
        res.status(200).json({message : 'User Created', status: 'ok'});
    }catch(e){
        return res.status(400).json({error : {
            message: e.message,
            status: 'bad',
            try: {
                1: '[1] Field Username or Password or Email is Cannot Be Empty',
                2: '[2] Email Must Contains @',
                3: '[3] ID Shouldnt Be Empty (Primary Key)',
                4: '[4] Password Length Minimum Six Character',
                5: '[5] Email is Already Exist'
        }
        }})
        
    }
}

const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            throw new Error('Email or Password Cannot Be Empty');    
        }
        const findUserExist = await User_Auth.findOne({where: {email}});
        if( !findUserExist ){
            throw new Error('Email Doesnt Exist');
        }
        const {id, username} = findUserExist
        const passwordDecrypted = decryptPassword(password, findUserExist.password);
        if(!(email && passwordDecrypted)){
            throw new Error('Email or Password is Incorrect');
        }
        const token = createToken({_id: id, username, email});
        res.status(200).json({message: 'Login Success', accessToken: token});
    }catch(e){
        return res.status(400).json({
            message: e.message,
            status: 'bad',
            try: {
                1: '[1] Make Sure User is Exist in Database',
                2: '[2] Field Your Email and Password Since it Cannot be Empty'
            }
        });
    }
}
export {
    createUser,
    login
}