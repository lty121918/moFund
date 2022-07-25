import Router from './router.js'
import UserInfo from './userInfo.js'
import Util from './util.js'
import Model from './model.js'
import DateTime from './dateTime.js'
import md5 from "./md5.js";
import base64 from './base64.js'
import Validate from './validate.js'
const userInfo = new UserInfo()
const router = new Router()
const model = new Model()
const util = new Util()
const dateTime = new DateTime()
const validate = new Validate()
const utils= {
	userInfo,
	router,
	util,
	model,
	dateTime,
	md5,
	base64,
	validate
}
export {
	utils
}
