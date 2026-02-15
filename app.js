var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ffmpeg = require('fluent-ffmpeg');

// Configure ffmpeg and ffprobe paths
ffmpeg.setFfmpegPath(require('ffmpeg-static'));
ffmpeg.setFfprobePath(require('ffprobe-static').path.trim());

var indexRouter = require('./routes/index');
var browseRouter = require('./routes/browse');
var thumbRouter = require('./routes/thumb');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/browse', browseRouter);
app.use('/api/thumb', thumbRouter);

module.exports = app;
