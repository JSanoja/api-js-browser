var express = require('express');
var router = express.Router();
const { readdirSync } = require('fs');
const sourceFolder = "./public/source/"
const getDirectories = source =>
  readdirSync(sourceFolder + source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const getVideos = source =>
  readdirSync(sourceFolder + source, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && (dirent.name.includes("mp4") || dirent.name.includes("avi")))
    .map(dirent => dirent.name)

const getCover = source =>
  readdirSync(sourceFolder + source, { withFileTypes: true })
    .filter(dirent => (dirent.isFile() && dirent.name.includes("cover")))
    .map(dirent => dirent.name)[0]

/* GET users listing. */
router.get('/', function (req, res, next) {
  path = req.query.path ? req.query.path : "";
  res.send({
    path: path,
    folders: getDirectories(path),
    videos: getVideos(path),
    cover: "/source" + path + "/" + getCover(path)
  });
});

module.exports = router;
