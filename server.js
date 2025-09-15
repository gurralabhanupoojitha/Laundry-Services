const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3000;
function serverFile(res,filepath,contentType,statusCode=200){
    fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 - Internal Server Error");
    } else {
      res.writeHead(statusCode, { "Content-Type": contentType });
      res.end(data);
    }
  });
}

// Create the server
const server = http.createServer((req, res) => {
  // Normalize requested URL
  let route = req.url;

  switch (route) {
    case "/":
    case "/home":
      serveFile(res, path.join(__dirname, "home.html"), "text/html");
      break;

    case "/about":
      serveFile(res, path.join(__dirname, "about.html"), "text/html");
      break;

    case "/contact":
      serveFile(res, path.join(__dirname, "contact.html"), "text/html");
      break;

    case "/style.css":
      serveFile(res, path.join(__dirname, "style.css"), "text/css");
      break;

    default:
      // Custom 404 page
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(<h1>404 - Page Not Found</h1><p>The page ${route} does not exist.</p>);
      break;
  }
});

// Start server
server.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}/');
});
