import { HTTP_STATUS } from '../err/http-status.js';
class ERROS extends Error {
    constructor(name, message, status) {
        super(name, message, status)
        this.status = status
    }
    dataUndefined() {
        thi.name = "Data undefined"
        thi.message = "Data undefined"
        thi.status = HTTP_STATUS.BAD_REQUEST
        return this
    }
    NoValue(value) {
        this.name = "Giá trị nhập sai"
        this.message = `Cannot find ${value}`
        this.status = HTTP_STATUS.NOT_FOUND
        return this
    }
    duplicateValue(value) {
        this.name = 'Giá trị nhập sai'
        this.message = `Không khớp giá trị trong database ${value}`
        this.status = HTTP_STATUS.NOT_ACCEPTABLE
        return this
    }
    wrongUsernameOrPassword() {
        this.name = 'Sai giá trị nhập'
        this.message = 'Sai userName hoặc password'
        this.status = HTTP_STATUS.UNAUTHORIZED
        return this
    }
    invalidToken() {
        this.name = 'JWT Error'
        this.message = `Invalid Token`
        this.code = HTTP_STATUS.UNAUTHORIZED
        return this
    }
    wrongEmail() {
        this.name = 'Sai giá trị nhập'
        this.message = 'Sai Email'
        this.status = HTTP_STATUS.UNAUTHORIZED
        return this
    }
    failedSave() {
        this.name = 'Không thể lưu giá trị'
        this.message = '?token'
        this.status = HTTP_STATUS.UNAUTHORIZED
        return thi
    }
}
export default ERROS