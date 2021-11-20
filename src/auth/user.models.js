// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    role:{
       type: String,
       trim: true,
       require:[true,"role must be required"]
    },
    fullName: {
        type: String,
        unique: true,
        trim: true,
        require: [true, 'fullName must be require']
    },
    phone: {
        type: String,
        require: [true, 'phone must be require']
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        require: [true, 'email must be require']
    },
    userName: {
        type: String,
        unique: true,
        trim: true,
        require: [true, 'userName must be require']
    },
    password: {
        type: String,
        trim: true,
        require: [true, 'passWord must be require'],
        minLength: [6, 'password must be at least 6 characters']
    },
    position: {
        type: String,
        require: [true, 'position must be require']
    },
    DateOfBirth: {
        type: Date,
        require: [true, 'dateOfBirth must be require']
    },
    avatar:{
       type: String,
    },
    status: {
        type: String,
        require: [true, 'status must be require']
    },
    address: {
        type: String,
        trim: true,
        require: [true, 'address must be require']
    },
    createBy: {
        type: String,
        trim: true,
        require: [true, 'createBy must be require']
    },
    updateBy: {
        type: String,
        trim: true,
        require: [true, 'updateBy must be require']
    }
}, { timestamps: true });
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        console.log("dsad")
        next();
    } catch (error) {
        console.log(error);
    }
})


const User = mongoose.model('User', userSchema);
export default User;