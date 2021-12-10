import User from '../../auth/user.models.js'
import _ from 'lodash';
import moment from 'moment'


export const list = async (req, res, next) => {
   let isSearch = false;
   var search = {};
   if(!_.isEmpty(req.query)){
       var {
        specialized: specializedParams,
        course: courseParams,
        gender: genderParams,
        report: reportParmas,
        status: statusParams,
        facilities: facilitiesParams,
        email: searchParams,
       } = req.query;
       for (const key in req.query) {
           if (key != null) {
              search[`${key}`] = req.query[`${key}`];
           }
       }
       isSearch = true;
   }
   try {
    let perPage = 2;
    let page = Number(req.params.page) || 1;
    const listUser = await User.find(search)
    .skip(perPage * page - perPage)
    .limit(perPage);
    const countDoc = await User.countDocuments(search);
    const countPage = Math.ceil(countDoc / perPage);
    const arrPage = [];
    const userDB = await User.find({});
    // nếu tổng countPage - page >= 5
    if (countPage - page >= 5) {
        // nếu page - 1 khác 0 render từ page -1
        if (page - 1) {
          for (let i = page - 1; i <= page + 3; i++) {
            arrPage.push(i);
          }
        } else {
          // nếu page lớn hơn 1
          for (let i = page; i <= page + 4; i++) {
            arrPage.push(i);
          }
        }
      } else {
        // render 5 page cuối
        if (countPage >= 5) {
          const pageRest = countPage - page;
          for (let i = page - (5 - pageRest); i <= page + pageRest; i++) {
            arrPage.push(i);
          }
        } else {
          for (let i = 1; i <= countPage; i++) {
            arrPage.push(i);
          }
        }
      }
      let payload = {
        users: listUser,
        userDB: userDB,
        arrPage,
        countTo: perPage * page,
        countFrom: perPage * (page - 1) + 1,
        page: page,
        pre: Number(page) - 1 || arrPage.length,
        next: Number(page) + 1 > arrPage.length ? 1 : Number(page) + 1,
       
       
        isSearch,
        buttonFirt: page > 1 ? true : false,
        buttonLast: page !== countPage ? true : false,
        countPage,
        timeStamp: moment().unix(),
      };
      if (!_.isEmpty(req.query)) {
        payload = {
          ...payload,
          specializedParams,
          courseParams,
          genderParams,
          reportParmas,
          statusParams,
          facilitiesParams,
          searchParams,
        };
      }
      console.log(payload,"abc");
      res.render('profile', payload);
   } catch (error) {
       res.status(500).send({message: error.message});
   }
}
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (email == 'admin' && password == 'admin')
            return res.redirect('/home'+ moment().unix());

        const data = await User.findOne({ email, password });

        if (!data) return res.redirect('login', { msgError: 'Sai email hoặc mậy khẩu' });
        
        if (data.role != 'admin') return res.render('login', { msgError: 'Tài Khoản không có quyền hạn' })
        
        res.redirect('/home' + moment().unix());
    } catch (error) {
        res.status(500).send(error.message);
    }
}
export const logout = async (req,res,next) => {
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                return next(err);
            }else{
                return res.redirect('/');//đoạn này còn thiều đường dẫn
            }
        })
    }
}