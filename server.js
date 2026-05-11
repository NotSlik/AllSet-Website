const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 5173;
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";

  const filePath = path.resolve(root, `.${pathname}`);
  if (!filePath.startsWith(`${root}${path.sep}`) && filePath !== root) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    res.end(data);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`AllSet local page: http://127.0.0.1:${port}`);
});
