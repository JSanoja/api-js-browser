
var express = require('express');
var router = express.Router();
var ffmpeg = require('fluent-ffmpeg');

const sourceFolder = "./public/source"


/* GET users listing. */
router.get('/', function (req, res, next) {
    let path = req.query.path ? req.query.path : "";
    console.log(path)
    try {
        let outputFolder = path.split('/')
        outputFolder.splice(outputFolder.length - 1, 1);
        let outputFileName = path.split('/')[path.split('/').length - 1] + ".jpg"
        var proc = ffmpeg(sourceFolder + path)
            .on('filenames', function (filenames) {
                console.log('Will generate ' + filenames.join(', '))
            })
            .on('end', function () {
                console.log('Screenshots taken');
                res.send('sucess')
            })
            .screenshots({
                // Will take screens at 20%, 40%, 60% and 80% of the video
                count: 1,
                filename: outputFileName,
                folder: sourceFolder + outputFolder.join("/")
            });
    } catch (e) {
        res.send(e)
    }

});

module.exports = router;
