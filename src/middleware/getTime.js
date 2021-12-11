export const getTimeZone = (req,res,next) => {
    let time = new Date().toLocaleString("VN", { timeZone: "Asia/Ho_Chi_Minh" });
    req.getTime = time;
    next();
}