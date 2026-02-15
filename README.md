# API JS Browser

A Node.js/Express application that serves a web-based browser interface for video content with thumbnail generation capabilities using FFmpeg.

## Features

- Browse video content organized by series and seasons
- Automatic video thumbnail generation
- RESTful API for content browsing
- Static file serving with a built Angular frontend
- FFmpeg integration for video processing

## Prerequisites

- Node.js (v14 or higher) recommend v25
- npm

## Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development

Start the development server with nodemon (auto-reload on file changes):
```bash
npm run watch
```

### Production

Start the application:
```bash
npm start
```

The server will run on `http://localhost:3000`

## Project Structure

```
api-js-browser/
├── bin/
│   └── www                    # Application entry point
├── public/
│   ├── index.html            # Main HTML file
│   ├── main-*.js             # Angular app bundle
│   ├── styles.css            # Application styles
│   ├── assets/               # Manifest and browser config
│   └── source/               # Video content directory
│       └── siliconvalley/    # Example series
│           └── season1/      # Example season with videos
├── routes/
│   ├── index.js              # Home page route
│   ├── browse.js             # Content browsing API
│   └── thumb.js              # Thumbnail generation API
├── app.js                     # Express app configuration
├── package.json               # Project dependencies
└── README.md                  # This file
```

## API Endpoints

### Browse API (`/api/browse`)

**GET** `/api/browse?path=/[path/to/content]`

Returns a list of available files and directories at the specified path.

**Response:**
```json
[
  {
    "name": "siliconvalley",
    "isDirectory": true,
    "path": "/siliconvalley"
  },
  {
    "name": "cap1.mp4",
    "isDirectory": false,
    "path": "/siliconvalley/season1/cap1.mp4"
  }
]
```

### Thumbnail API (`/api/thumb`)

**GET** `/api/thumb?path=[path/to/video.mp4]`

Generates a thumbnail image for the specified video file.

**Response:** Returns the path to the generated thumbnail image.

## Dependencies

- **express** - Web framework
- **morgan** - HTTP request logger
- **cookie-parser** - Cookie parsing middleware
- **fluent-ffmpeg** - FFmpeg wrapper for video processing
- **ffmpeg-static** - FFmpeg binary bundled for Node.js
- **ffprobe-static** - FFprobe binary bundled for Node.js
- **thumbsupply** - Additional thumbnail generation support

### Dev Dependencies

- **nodemon** - Auto-restart server on file changes

## Configuration

### FFmpeg/FFprobe

The application automatically uses bundled FFmpeg binaries from `ffmpeg-static` and `ffprobe-static` packages. No manual FFmpeg installation is required.

### Media Source

Place your video content in the `public/source/` directory, organized by series and seasons:

```
public/source/
├── seriesname/
│   ├── season1/
│   │   ├── episode1.mp4
│   │   └── episode2.mp4
│   └── season2/
│       └── episode1.mp4
```

## Development Notes

- The frontend is a built Angular application (compiled files in `public/`)
- Modify backend routes in the `routes/` directory
- FFmpeg paths are configured in `app.js`
- Use `npm run watch` for development with auto-reload

## License

Private project
