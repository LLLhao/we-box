const fs = require("fs");
const path = require('path')


function filePath(dir){
    return path.join(__dirname, '..', 'mock',`${dir}.json`)
}

module.exports = function mock(app) {

    app.use('/api', (req, res, next) => {
        console.log(`==== request info:${req.originalUrl}, params:${JSON.stringify(req.params)}, query:${JSON.stringify(req.query)}`)

        const file = filePath(req.originalUrl.split('?')[0])

        // 判断
        fs.exists(file, function (exists) {
            if (exists) {
                res.status(200)
                res.sendFile(file)
            }
            if (!exists) {
                res.status(404)
                res.sendFile(path.join(__dirname, '..', 'mock',`404.html`))
            }
        })
    })
}