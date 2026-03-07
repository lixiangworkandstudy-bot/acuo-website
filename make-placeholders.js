const fs = require('fs');
const base64Pixel = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+O1NPQAIgAMJ3/fIfwAAAABJRU5ErkJggg=="; // grey pixel
const buffer = Buffer.from(base64Pixel, 'base64');
fs.writeFileSync('images/case-douyin.jpg', buffer);
fs.writeFileSync('images/case-pod1.jpg', buffer);
fs.writeFileSync('images/case-pod2.jpg', buffer);
fs.writeFileSync('images/case-pod3.jpg', buffer);
