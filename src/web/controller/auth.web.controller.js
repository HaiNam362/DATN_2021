import User from '../../auth/user.models.js'
import _ from 'lodash';
import moment from 'moment'


export const list = async (req, res, next) => {
//    let isSearch = false;
//    var search = {};
//    if(!_.isEmpty(req.query)){
//        var {

//        }
//    }
}
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (email == 'admin' && password == 'admin')
            return res.redirect('/home' );

        // const data = await User.findOne({ email, password });

        // if (!data) return res.redirect('login', { msgError: 'Sai email hoặc mậy khẩu' });
        
        // if (data.role != 'admin') return res.render('login', { msgError: 'Tài Khoản không có quyền hạn' })
        
        // res.redirect('/home' + moment().unix());
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