import User from '../../auth/user.models.js'
import _ from 'lodash';
import moment from 'moment'


export const listUser = async(req, res, next) => {
    let { keySearch } = req.query;
    let data;


    if (keySearch) {
        var options = {
            email: { $regex: ".*" + keySearch + ".*" }
        }
        data = await User.find(options);
        console.log(data, 1);
    } else {
        data = await User.find();

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




// export const listUser = async (req, res, next) => {

//   try {
//     const UserDB = await User.find({});
//     console.log(UserDB);
//     res.render('profile', { UserDB, test: 'ok' });
//   } catch (error) {
//     console.log(error.message)
//   }

// }
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

// <div class="mb-3">
// <label class="form-label">Email</label>
// <input type="text" class="form-control">
// </div>
// <div class="mb-3">
// <label class="form-label">UserName</label>
// <input type="text" class="form-control">
// </div>
// <div class="mb-3">
// <label class="form-label">Password</label>
// <input type="text" class="form-control">
// </div>
// <div class="mb-3">
// <label class="form-label">DateOfBirth</label>
// <input type="text" class="form-control">
// </div>
// <div class="mb-3">
// <label class="form-label">Address</label>
// <input type="text" class="form-control">
// </div>