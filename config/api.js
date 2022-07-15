/**
 * 拉取接口
 */
const fs = require('fs')
const request = require('request')
const config = require('./config')
let str = ``

let obj = {}
getServer(config.DOC_URL)

function getServer(url) {
	request(`${url}/swagger-resources`, (error, response, body) => {
		console.log(`${url}/swagger-resources`)
		console.log(body)
		if (!error && response.statusCode == 200) {
			console.log(body)
			const SERVER_LIST = JSON.parse(`${body}`)
			SERVER_LIST.map(item => {
				sendRequest(`${config.DOC_URL}${item.url}`)
			})
		}
	})
}

function sendRequest(url) {
	console.log(url)
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			let apiListObj = JSON.parse(`${body}`).paths // 接口地址对象（当前文档所有的接口地址都在这个对象里）
			for (let i in apiListObj) {
				let name = i.split('/').join('_')
				let name2 = name.split('-').join('_')
				if (obj[name2]) {
					continue
				}

				if (apiListObj[i].post) {
					str += `  "${name2}": '${i}', // ${apiListObj[i].post.summary}\n`
				} else if (apiListObj[i].get) {
					str += `  "${name2}": '${i}', // ${apiListObj[i].get.summary}\n`
				}

				obj[name2] = true
			}
		}
		// 如果是最后一个接口，则写入
		writeFile(str)
	})
}

function writeFile(str) {
	// 去除最后一个逗号
	// var r = /,+$/;
	console.log(str)
	str = str.replace(/,([^,]*?)$/g, `$1`)
	fs.writeFile(
		'./apis.js',
		`const APIS_LIST = {
${str}}
export default APIS_LIST
`,
		err => {
			if (err) throw err
			// console.log('写入完成')
		}
	)
}
