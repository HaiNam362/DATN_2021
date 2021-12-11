import User from '../../auth/user.models.js'
import _ from 'lodash';
import moment from 'moment'


export const listUser = async (req, res, next) => {
  let { keySearch } = req.query;
  let data;

  if (keySearch) {
    var options = {
      email: { $regex: ".*" + keySearch + ".*" }
    }
    data = await User.find( options);
    console.log(data, 1);
  }
  else {
    data = await User.find();

  }

  res.render('profile', { UserDB: data });
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
export const login = async (req, res, next) => {
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