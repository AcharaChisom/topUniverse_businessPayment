const fs = require('fs')
// make a new directory if the directory does not exist
exports.createDirIfNotExists = (dir) => {
	if(!fs.existsSync(dir)){
		fs.mkdirSync(dir)
	}
}