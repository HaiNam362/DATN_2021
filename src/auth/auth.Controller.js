import User  from './user.models.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            status: 'register success',
            result: user
        })
    } catch (error) {
        console.log(error);

    }
}
export const login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            res.status(400).json({
                status: 'not found',
                message: 'email is not correct',
            })
        } else {
            let check = await bcrypt.compareSync(req.body.passWord, user.password);
            if (user.email === email && check == true) {
                const token = jwt.sign({ userId: user._id }, 'project', { algorithm: 'HS256' });
                res.status(200).json({
                    status: 'login success',
                    data: {
                        token, userName: user.name,
                    }
                })
            } else {
                res.status(400).json({
                    status: false,
                    message: 'password do not exist',
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
            status: 'get list user success',
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
        const user = await User.findOne({ _id: id  });
        res.status(200).json({
            status: 'get list user + id success',
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
                message: 'data to update can not be empty!'
            })
        }
        const id = req.params.id;
        const userDB = await User.findOne({ _id: id });
        if (!userDB) {
            res.status(404).send({ message: 'User not found' });
        }
        const userDB2 = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        await userDB2.save();
        return res.status(200).send({
            message: 'update user successfully',
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
        res.status(200).send("delete user successfully");
    } catch (error) {
        res.status(500).send(error);
    }
}
export const uploadAvatar = async (req,res,next) => {
    try {
        const userID = req.user;
        let userDB = await User.findOneAndUpdate({_id:userID},{avatar: req.file.filename},{ returnOriginal: false});
        console.log(userDB,"1234");
        if(!userDB) {
            return res.status(404).send({ message:'not found' });
        }
        console.log(req.file.filename,"9876");
        res.status(200).send({ 
            message:'upload avatar successfully',
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
            status: 'register success',
            result: user
        })
    } catch (error) {
        console.log(error);

    }
}
export const getEmployees = async (req,res,next) => {
    try {
        const user = await User.find({role:"employee"})
        return res.status(200).json({
            message: "get employee",
            result: user.length,
            data: {user}
        })
    } catch (error) {
        console.log(error);
    }
}

export const changePassword = async (req,res,next) => {
    
}

export const logout = async (req,res,next) => {
    
}