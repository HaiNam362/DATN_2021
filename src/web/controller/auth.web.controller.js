import User from '../../auth/user.models.js'
import _ from 'lodash';
import moment from 'moment'
import bcrypt from 'bcryptjs'

export const listUser = async (req, res, next) => {
    let { keySearch } = req.query;
    let data;
    let data2 = [];
    if (keySearch) {
        var options = {
            email: { $regex: ".*" + keySearch + ".*" },
        }
        data = await User.find(options);
        console.log(data, 1);
    } else {
        let dataALL = await User.find();
        for (let index = 0; index < dataALL.length; index++) {
            if (dataALL[index].role == 'employee' || dataALL[index].role == 'dataEntry') {
                data2.push(dataALL[index]);
            }
        }
    }
    if (keySearch) {
        return res.render('profile', { UserDB: data });

    }
    res.render('profile', { UserDB: data2 });
}
export const findOneProfile = async (req, res) => {
    try {
        let { email } = req.params;
        let UserDB = await User.findOne({ email });
        if (!UserDB) {
            return res.sendStatus(404);
        }
        let payload = {
            UserDB,
        }
        console.log(email);
        res.render('profileDetail', payload);
    } catch (error) {
        res.send(error.message);
    }
}

export const createUser = async (req, res, next) => {
    try {
        await User.create(req.body);
        res.redirect('/profile');

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const DeleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.body._id);
        res.redirect('/profile');

    } catch (error) {
        res.status(500).send(error);
    }

}


export const login = async (req, res, next) => {
    try {
        const { phone, password } = req.body;

        const data = await User.findOne({ phone, role: 'admin' });
        if (!data) {
            return res.render('login', { msgError: 'Sai số điện thoại ' });
        }
        let check = await bcrypt.compareSync(password, data.password);
        if (data.phone === phone && check == true) {
            res.cookie("token", data, { maxAge: 1000 * 60 * 60 });
            res.redirect('/home');
        } else {
            return res.render('login', { msgError: 'Sai Mật Khẩu' })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}


export const logout = async (req, res, next) => {
    try {
        res.clearCookie('token');
        res.redirect('/')
    } catch (error) {
        res.send(error.message);
    }
}
// profileDetail

export const listUserDetail = async (req, res, next) => {
    try {
        const { email } = req.params;
        let data = await User.findOne({ email });
        // console.log(data,1222);
        if (!data) {
            return res.sendStatus(404)
        }
        res.render('profileDetail', { UserDetailDB: data });
    } catch (error) {
        res.send(error.message);
    }

}

export const deleteUserDetail = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.body._id);
        res.redirect('/profile');
    } catch (error) {
        res.send(error.message);
    }
}