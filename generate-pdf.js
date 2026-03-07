const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3210', { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for fonts and images to load
    await new Promise(r => setTimeout(r, 3000));

    // Trigger all scroll animations
    await page.evaluate(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    });

    await new Promise(r => setTimeout(r, 1000));

    await page.pdf({
        path: '/Users/lixiang/.gemini/antigravity/scratch/acuo-website/阿措-个人官网.pdf',
        format: 'A4',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        preferCSSPageSize: false
    });

    console.log('PDF exported successfully!');
    await browser.close();
})();
