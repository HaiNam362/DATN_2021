import User from '../../auth/user.models.js'
import _ from 'lodash';
import moment from 'moment'


export const listUser = async(req, res, next) => {
    let { keySearch } = req.query;
    let data;

    if (keySearch) {
        var options = {
            email: { $regex: ".*" + keySearch + ".*" },
        }
        data = await User.find(options);
        console.log(data, 1);
    } else {
        data = await User.find({ role: "employee" });

    }

    res.render('profile', { UserDB: data });
}
export const findOneProfile = async(req, res) => {
    try {
        let { email } = req.params;

        console.log(email);
        // let user = await User.findOne({ email });
        // if (!user) return res.sendStatus(404);
        // res.render('test123', user);
        res.render('test123', { email });

    } catch (error) {
        res.send(error.message);
    }
}

export const listCustomers = async(req, res, next) => {
    let { keySearch } = req.query;
    let data;


    if (keySearch) {
        var options = {
            email: { $regex: ".*" + keySearch + ".*" },
        }
        data = await User.find(options);
        console.log(data, 1);
    } else {
        data = await User.find({ role: "customer" });

    }

    res.render('customer', { UserDB: data });
}

export const createUser = async(req, res, next) => {
    try {
        await User.create(req.body);
        res.redirect('/profile');

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const DeleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.body._id);
        res.redirect('/profile');

    } catch (error) {
        res.status(500).send(error);
    }

}


export const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        if (email == 'admin' && password == 'admin')
            return res.redirect('/home');

        const data = await User.findOne({ email, password });

        if (data != email) return res.redirect('login', { msgError: 'Sai email' })
        if (data != password) return res.redirect('login', { msgError: 'Sai mật khẩu' });

        if (data.role != 'admin') return res.render('login', { msgError: 'Tài Khoản không có quyền hạn' })

        res.redirect('/home');
    } catch (error) {
        res.status(500).send(error.message);
    }
}


export const logout = async(req, res, next) => {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/'); //đoạn này còn thiều đường dẫn
            }
        })
    }
}

