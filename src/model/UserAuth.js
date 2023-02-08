import db from '../../config/db.js';
import { DataTypes } from 'sequelize';
const User_Auth = db.define( 'users', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
},{freezeTableName: false, timestamps: false})

export default User_Auth;