const scale = uni.getSystemInfoSync().windowWidth / 750
/** @description canvas 绘制自定义圆角的矩形(默认填充色)-hyf
   *  x-位置x坐标, y-位置y坐标, w-元素宽度, h-元素高度, r-圆角
   *  if config = color // 默认填充色
   * else config = {
   * type: fill / stroke / both,填充/描边/填充和描边
   * fillColor: color, //填充色
   * strokeColor: color, //描边色
   * round:{ // 配置哪个方向的角是圆角，默认不传全是圆角
   *   leftTop: boole, // 是否圆角
   *   leftBottom: boole, // 是否圆角
   *   rightTop: boole, // 是否圆角
   *   rightBottom: boole, // 是否圆角
   * }
    }**/
export const roundRect = function(ctx, x, y, w, h, r, config) {
	let color = 'transparent'
	if (typeof config === 'string') {
		color = config
	}
	ctx.save()
	// 开始绘制
	ctx.beginPath()
	// 因为边缘描边存在锯齿，最好指定使用 transparent 填充
	if (config.type) {
		if (config.type === 'fill') {
			ctx.setFillStyle(config.fillColor || 'transparent')
		} else if (config.type === 'stroke') {
			ctx.setStrokeStyle(config.strokeColor || 'transparent')
		} else if (config.type === 'both') {
			ctx.setFillStyle(config.fillColor || 'transparent')
			ctx.setStrokeStyle(config.strokeColor || 'transparent')
		}
	} else {
		ctx.setFillStyle(color)
	}
	if (!config.round || config.round.leftTop) {
		// 绘制左上角圆弧
		ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
		// 绘制border-top
		ctx.moveTo(x + r, y)
	} else {
		// 绘制border-top
		ctx.moveTo(x, y + r)
		ctx.lineTo(x, y)
		ctx.lineTo(x + r, y)
	}
	ctx.lineTo(x + w - r, y)
	if (!config.round || config.round.rightTop) {
		// 绘制右上角圆弧
		ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
	} else {
		ctx.lineTo(x + w - r, y)
		ctx.lineTo(x + w, y)
		ctx.lineTo(x + w, y + r)
	}
	// 绘制border-right
	ctx.lineTo(x + w, y + h - r)
	if (!config.round || config.round.rightBottom) {
		// 绘制右下角圆弧
		ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
	} else {
		ctx.lineTo(x + w, y + h - r)
		ctx.lineTo(x + w, y + h)
		ctx.lineTo(x + w - r, y + h)
	}
	// 绘制border-bottom
	ctx.lineTo(x + r, y + h)
	if (!config.round || config.round.leftBottom) {
		// 绘制左下角圆弧
		ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
	} else {
		ctx.lineTo(x + r, y + h)
		ctx.lineTo(x, y + h)
		ctx.lineTo(x, y + h - r)
	}
	// 绘制border-left
	ctx.lineTo(x, y + r)

	if (config.type) {
		if (config.type === 'fill') {
			ctx.fill()
		} else if (config.type === 'stroke') {
			ctx.stroke()
		} else if (config.type === 'both') {
			ctx.stroke()
			ctx.fill()
		}
	} else {
		ctx.fill()
	}

	ctx.closePath()
	// 剪切
	ctx.clip()
	ctx.restore()
}
export const getWH = (className = "input-result") => {
	return new Promise(resolve => {
		let info = uni.createSelectorQuery().in(this).select("." + className);
		info.boundingClientRect(function(data) {
			//	data - 包含元素的高度等信息
			resolve({
				height: data.height,
				width: data.width
			})

		}).exec()
	})
}
//绘制图片封装
export const drawImage = async (ctx, url, x, y, w, h) => {
	console.log(url);
	if (url.indexOf('http') > -1) {
		url = await generateImg(url)
		console.log('url', url);
	} else if (url.indexOf('data:image') > -1) {
		url = await base64Img(url)
	}
	ctx.drawImage(url, x, y, w, h);
	ctx.restore()
	return url
}
// 绘制只有一行的文字
export const drawNormalText = (ctx, str, x, y, font, style, align, baseLine) => {
	ctx.setFontSize(font);
	ctx.setFillStyle(style);
	ctx.setTextAlign(align);
	ctx.setTextBaseline(baseLine);
	ctx.fillText(str, x, y);
	ctx.restore()
}
// 绘制只有一行的文字
const fillText = (ctx, textOptions) => {
	ctx.setFillStyle(textOptions.color || '#3B2E2C');
	ctx.setFontSize(textOptions.size || '12');
	ctx.setTextBaseline(textOptions.textBaseline || "top");
	ctx.fillText(textOptions.text, textOptions.x, textOptions.y);
	ctx.restore()
};
// 处理网络图片
export const generateImg = (current) => {
	return new Promise((resolve, reject) => {
		uni.getImageInfo ?
		uni.getImageInfo({
			src: current,
			success: (res) => {
				console.log('网络图', res.path);
				resolve(res.path);
			},
		}) :
		resolve(current);
		// wx.downloadFile({
		// 	url: current,
		// 	success(res) {
		// 		wx.getFileSystemManager().readFile({
		// 			filePath: res.tempFilePath, //选择图片返回的相对路径
		// 			encoding: 'base64', //编码格式
		// 			success: res => { //成功的回调
		// 				resolve('data:image/png;base64,' + res.data)
		// 			}
		// 		})
		// 	},
		// 	fail: () => {
		// 		resolve(current);
		// 	}
		// })
	});


}
// 处理base64图片
export const base64Img = (current) => {
	return new Promise((resolve, reject) => {
		const wxQRCode = current;
		const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(wxQRCode) || [];
		if (format) {
			// 获取微信的文件工具
			const fsm = wx.getFileSystemManager();
			// 定义完整的临时文件路径，wx.env.USER_DATA_PATH是微信文件的根目录
			const filePath = `${wx.env.USER_DATA_PATH}/wxQRCode.${format}`;
			// base64 数据转换为 ArrayBuffer 数据
			const buffer = wx.base64ToArrayBuffer(bodyData);
			// 写入系统空间
			fsm.writeFile({
				filePath: filePath,
				data: buffer,
				encoding: 'binary',
				success: (res) => {
					// 写入成功之后就可以使用临时路径了，后面跟使用网络图片的保持一致
					console.log('写入成功, 路径: ', res, filePath);
					resolve(filePath)
				},
				fail: err => {
					console.log(err);
				},
			});
		}
	});


}
// 绘制段落
export const fillParagraph = (ctx, textOptions) => {
	ctx.setFontSize(textOptions.size);
	let tempOptions = JSON.parse(JSON.stringify(textOptions));
	// 如果没有指定行间距则设置默认值
	tempOptions.lineSpace = tempOptions.lineSpace ? tempOptions.lineSpace : 10;
	// 获取字符串
	let str = textOptions.text;
	// 计算指定高度可以输出的最大行数
	let lineCount = Math.floor((tempOptions.height + tempOptions.lineSpace) / (tempOptions.size + tempOptions
		.lineSpace));
	// 初始化单行宽度
	let lineWidth = 0;
	let lastSubStrIndex = 0; //每次开始截取的字符串的索引

	// 构建一个打印数组
	let strArr = str.split("");
	let drawArr = [];
	let text = "";
	while (strArr.length) {
		let word = strArr.shift();
		text += word;
		let textWidth = ctx.measureText(text).width;
		if (textWidth > textOptions.width) {
			// 因为超出宽度 所以要截取掉最后一个字符
			text = text.substr(0, text.length - 1);
			drawArr.push(text);
			text = "";
			// 最后一个字还给strArr
			strArr.unshift(word);
		} else if (!strArr.length) {
			drawArr.push(text);
		}
	}

	if (drawArr.length > lineCount) {
		// 超出最大行数
		drawArr.length = lineCount;
		let pointWidth = ctx.measureText("...").width;
		let wordWidth = 0;
		let wordArr = drawArr[drawArr.length - 1].split("");
		let words = "";
		while (pointWidth > wordWidth) {
			words += wordArr.pop();
			wordWidth = ctx.measureText(words).width;
		}
		drawArr[drawArr.length - 1] = wordArr.join("") + "...";
	}
	// 打印
	for (let i = 0; i < drawArr.length; i++) {
		let _h = i > 0 ? tempOptions.size + tempOptions.lineSpace : 0;
		tempOptions.y = tempOptions.y + _h; // y的位置
		tempOptions.text = drawArr[i]; // 绘制的文本
		fillText(ctx, tempOptions);
	}
	ctx.restore()
}
/**
 * desc  文字换行
ctx：     画布的上下文环境
content： 需要绘制的文本内容
drawX：   绘制文本的x坐标
drawY：   绘制文本的y坐标
lineHeight：文本之间的行高
lineMaxWidth：每行文本的最大宽度
lineNum： 最多绘制的行数
*/

export const textPrewrap = (ctx, content, drawX, drawY, lineHeight, lineMaxWidth, lineNum, font) => {
	var drawTxt = ''; // 当前绘制的内容
	var drawLine = 1; // 第几行开始绘制
	var drawIndex = 0; // 当前绘制内容的索引
	ctx.setFontSize(font || 14);
	content = content.replace(/[\r\n]/g, "");
	console.log('content', content);
	// 判断内容是否可以一行绘制完毕
	if (ctx.measureText(content).width <= lineMaxWidth) {
		ctx.fillText(content, drawX, drawY);
	} else {
		for (var i = 0; i < content.length; i++) {
			drawTxt += content[i];
			// console.log(drawTxt);
			if (ctx.measureText(drawTxt).width >= lineMaxWidth) {
				// console.log('drawTxt',i,drawTxt,drawLine >= Number(lineNum));
				if (drawLine >= Number(lineNum)) {
					ctx.fillText(drawTxt + '..', drawX, drawY);
					break;
				} else {
					// console.log('drawTxt',i,drawTxt);
					ctx.fillText(drawTxt, drawX, drawY);
					drawIndex = i + 1;
					drawLine += 1;
					drawY += lineHeight;
					drawTxt = '';
				}
			} else {
				// 内容绘制完毕，但是剩下的内容宽度不到lineMaxWidth
				// console.log('111111111111111111111');
				if (i === content.length - 1) {
					ctx.fillText(drawTxt, drawX, drawY);
				}
			}
		}
	}
	ctx.restore()
}
