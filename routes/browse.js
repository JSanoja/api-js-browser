var express = require('express');
var ffmpeg = require('fluent-ffmpeg');
var router = express.Router();
const { readdirSync, existsSync } = require('fs');
const sourceFolder = "./public/source"
var generateThumb = function (path) {
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
      })
      .screenshots({
        // Will take screens at 20%, 40%, 60% and 80% of the video
        count: 1,
        filename: outputFileName,
        folder: sourceFolder + outputFolder.join("/")
      });
  } catch (e) {
    console.log(e)
  }
}

const getDirectories = source =>
  readdirSync(sourceFolder + source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const getVideos = source =>
  readdirSync(sourceFolder + source, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && dirent.name.includes("mp4") && !dirent.name.includes("mp4.jpg"))
    .map(dirent => dirent.name)

const getCover = source =>
  readdirSync(sourceFolder + source, { withFileTypes: true })
    .filter(dirent => (dirent.isFile() && dirent.name.includes("cover")))
    .map(dirent => dirent.name)[0]

/* GET users listing. */
router.get('/', function (req, res, next) {
  path = req.query.path ? req.query.path : "";
  let videos = getVideos(path);
  if (videos.length > 1) {
    videos.forEach(video => {
      console.log(sourceFolder + path + "/" + video, existsSync(sourceFolder + path + "/" + video + '.jpg'))
      try {
        if (!existsSync(sourceFolder + path + "/" + video + '.jpg')) {
          generateThumb(path + "/" + video);
        }
      } catch (error) {
        console.log(error)
      }

    })
  }
  res.send({
    path: path,
    folders: getDirectories(path),
    videos: videos,
    cover: "/source" + path + "/" + getCover(path)
  });
});

module.exports = router;
