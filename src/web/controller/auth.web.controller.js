import User from '../../auth/user.models.js'
import roomDetailModel from "../../roomDetail/roomDetailModel.js";
import _ from 'lodash';
import moment from 'moment'


export const listUser = async(req, res, next) => {
    let { keySearch } = req.query;
    let data;

<<<<<<< HEAD
    if (keySearch) {
        var options = {
            email: { $regex: ".*" + keySearch + ".*" }
        }
        data = await User.find(options);
        console.log(data, 1);
    } else {
        data = await User.find();
=======
  if (keySearch) {
    var options = {
      email: { $regex: ".*" + keySearch + ".*" }
    }
    data = await User.find(options);
    console.log(data, 1);
  }
  else {
    data = await User.find();
>>>>>>> 2836123dbd5d31a76e74e8ddd06df06d4b3f2406

    }

    res.render('profile', { UserDB: data });
}
export const findOneProfile = async (req, res) => {
  try {
    let { email } = req.params;

    console.log(email);
    // let user = await User.findOne({ email });
    // if (!user) return res.sendStatus(404);
    // res.render('test123', user);
    res.render('test123', {email});

  } catch (error) {
    res.send(error.message);
  }
}

export const createEmployee = async (req,res,next) => {
    let {role,fullName} = req.body; 

    /// Lấy thông tin từ field

}

// export const deleteProfile = async (req, res, next) => {
//   try {

//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// }

// export const createUser = async (req, res, next) => {
//   try {


//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// }






// export const listUser = async (req, res, next) => {

//   try {
//     const UserDB = await User.find({});
//     console.log(UserDB);
//     res.render('profile', { UserDB, test: 'ok' });
//   } catch (error) {
//     console.log(error.message)
//   }

// }
export const listRoom = async(req, res, next) => {

    const roomDB = await roomDetailModel.find({});
    res.render('table', { roomDB })
}
export const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        if (email == 'admin' && password == 'admin')
            return res.redirect('/home' + moment().unix());

        const data = await User.findOne({ email, password });

        if (!data) return res.redirect('login', { msgError: 'Sai email hoặc mậy khẩu' });

        if (data.role != 'admin') return res.render('login', { msgError: 'Tài Khoản không có quyền hạn' })

        res.redirect('/home' + moment().unix());
    } catch (error) {
        res.status(500).send(error.message);
    }
}
<<<<<<< HEAD
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
=======
export const logout = async (req, res, next) => {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');//đoạn này còn thiều đường dẫn
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
>>>>>>> 2836123dbd5d31a76e74e8ddd06df06d4b3f2406
