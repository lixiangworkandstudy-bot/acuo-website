const fs = require('fs');

// Generate a simple 1x1 base64 transparent gif if no image is found
// We will just create 4 copies of a base64 encoded placeholder
const imgDouyin = 'images/case-douyin.jpg';
const imgPod1 = 'images/case-pod1.jpg';
const imgPod2 = 'images/case-pod2.jpg';
const imgPod3 = 'images/case-pod3.jpg';

// Instead of base64, we can use an SVG and convert to JPG, or just create an SVG and save as JPG (browser handles it, though extension is wrong, but it works, but let's just create proper SVGs and rename in HTML if we want, OR just let user upload real ones and leave broken links for a second. Actually, I can download a random gradient image via curl for now).
