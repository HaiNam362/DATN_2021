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
    data = await User.find(options);
    console.log(data, 1);
  }
  else {
    data = await User.find();
  }
  res.render('profile', { UserDB: data });
}
export const findOneProfile = async (req, res) => {
  try {
    let { email } = req.params;

    console.log(email);
    let user = await User.findOne({ email });
    if (!user) return res.sendStatus(404);
    res.render('test123', user);
    // res.render('test123', { user });

  } catch (error) {
    res.send(error.message);
  }
}

export const createEmployee = async (req, res, next) => {
  try {
    let { role, fullName, phone, email, userName, passWord, DateOfBirth, Address } = req.body;
    console.log(req.body);
    let payload = {
      role,
      fullName,
      phone,
      email,
      userName,
      passWord,
      DateOfBirth,
      Address,
    }
    await User.create(payload);
    res.redirect('/profile')
  } catch (error) {
    res.send(error.message);
  }
}
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

