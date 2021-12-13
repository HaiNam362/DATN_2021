import User from './user.models.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Validator } from 'node-input-validator'
let pictureURL = 'https://datphongkhachsan.herokuapp.com/public/upload/'
import MUUID from 'uuid-mongodb'

export const register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            status: 'Register success',
            result: user
        })
    } catch (error) {
        console.log(error);

    }
}
export const login = async (req, res, next) => {
    try {
        const phone = req.body.phone;
        const user = await User.findOne({ phone: req.body.phone });
        console.log(user);
        if (!user) {
            res.status(400).json({
                status: 'not found',
                message: 'phone is not correct',
            })
        } else {
            let check = await bcrypt.compareSync(req.body.passWord, user.password);
            if (user.phone === phone && check == true) {
                const token = jwt.sign({ userId: user._id }, 'project', { algorithm: 'HS256' });
                res.status(200).json({
                    status: 'Login success',
                    data: {
                        user: user,
                        token, userName: user.name,
                    }
                })
            } else {
                res.status(400).json({
                    status: false,
                    message: 'Password do not exist',
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const getListUser = async (req, res, next) => {
    try {
        const user = await User.find({});
        return res.status(200).json({
            status: 'Get list user success',
            result: user.length,
            data: { user }
        })
    } catch (error) {
        console.log(error);
    }
}
export const getListUserId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({ _id: id });
        res.status(200).json({
            status: 'Get list user + id success',
            data: { user }
        })
    } catch (error) {
        console.log(error);
    }
}
export const UpdateOneUser = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                message: 'Data to update can not be empty!'
            })
        }
        const id = req.params.id;
        const userDB = await User.findOne({ _id: id });
        if (!userDB) {
            res.status(404).json({ message: 'User not found' });
        }
        const userDB2 = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        await userDB2.save();
        return res.status(200).send({
            message: 'Update user successfully',
            data: userDB2
        })
    } catch (error) {
        res.status(500).send(error);
    }
}
export const DelateOneUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id, req.body);
        if (!user) {
            res.status(404).send(" No item");
        }
        res.status(200).send("Delete user successfully");
    } catch (error) {
        res.status(500).send(error);
    }
}
export const uploadAvatar = async (req, res, next) => {
    try {
        const userID = req.user;
        let userDB = await User.findOneAndUpdate({ _id: userID }, { avatar: pictureURL + req.file.filename }, { returnOriginal: false });
        console.log(userDB, "1234");
        if (!userDB) {
            return res.status(404).send({ message: 'not found' });
        }
        console.log(req.file.filename, "9876");
        res.status(200).json({
            message: 'Upload avatar successfully',
            data: userDB
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateTokenID = async (req,res,next)=>{
    try {
        const userID = req.user;
        const tokenId = req.body.tokenId;
        let userDB = await User.findOneAndUpdate({_id: userID},{tokenId: req.body.tokenId},{returnOriginal: false});
        if(!userDB){
            return res.status(404).send({message: 'not found'});
        }
        return res.status(200).json({
            message: 'update tokenId successfully',
            data: userDB
        })
    } catch (error) {
        console.log(error);
    }
}

export const createEmployeeAccount = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            status: 'Register success',
            result: user
        })
    } catch (error) {
        console.log(error);

    }
}
export const getEmployees = async (req, res, next) => {
    try {
        const user = await User.find({ role: "employee" })
        return res.status(200).json({
            message: "Get employee",
            result: user.length,
            data: user 
           
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCustomer = async (req,res,next) => {
    try {
        const user = await User.find({role: 'customer'})
        return res.status(200).json({
            message: "Get customer",
            result: user.length,
            data: user
        })
    } catch (error) {
        console.log(error);
    }
}
export const UpdateTokenID = async (req,res,next) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

export const changePassword = async (req, res, next) => {

    try {
        const v = new Validator(req.body, {
            old_password: 'required',
            new_password: 'required',
            confirm_password: 'required|same:new_password'
        });
        const matched = await v.check();
        if (!matched) {
            return res.status(422).send(v.errors);
        }
        let current_user = await User.findOne({ _id: req.user });
        if (bcrypt.compareSync(req.body.old_password, current_user.password)) {
            let hashPassword = bcrypt.hashSync(req.body.new_password, 10);
            await User.updateOne({
                _id: current_user._id
            }, {
                password: hashPassword
            });
            let userData = await User.findOne({ _id: current_user._id })
            let token = jwt.sign({ data: userData }, 'project', { algorithm: 'HS256' })
            return res.status(200).json({
                message: 'Password successfully update',
                data: userData,
                token: token,
            })
        } else {
            return res.status(400).send({
                message: 'Password does not matched',
                data: {}
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const ResetPassWord = async (req, res, next) => {
    try {
        const { phone, password} = req.body;
        if(phone.length <1 || password.length <1 ) {
           return res.status(400).send({ message: "phone and password is required" });
        } 
        let dataUser = await User.findOne({phone: phone});
        if(!dataUser) {
            return res.status(404).send({message: 'not found'});
        }
        let hashPassword = bcrypt.hashSync(req.body.password);
        const newUser =  await User.findOneAndUpdate({_id: dataUser._id},{password: hashPassword});
        return res.status(200).json({
            message: 'Update forgot password successfully',
            data: newUser
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res, next) => {
    try {

    } catch (error) {

    }
}
export const getPhone = async (req, res, next) => {
    const phone = req.body.phone;
    console.log(phone,"abc");
    try {
        if(phone.length <1) {
            return res.status(404).send({message: 'not found'})
        }
        const user = await User.findOne({ phone: phone });
        if(!user){
            return res.status(400).send({message: 'phone not found'})
        }
        res.status(200).json({
            status: 'get phone',
            data:  user 
        })
    } catch (error) {
        console.log(error);
    }
}
