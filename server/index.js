const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express();
const glob = require('glob');
const path = require('path');



const STATIC_PATH = process.argv[process.argv.length - 1];
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready();
    }

    app.use(express.static(STATIC_PATH));

    app.use('/data.json', async function(req, res) {
        let list = await glob.sync(`${STATIC_PATH}/**/*.{jpg,jpeg,png,mp4,wmv,JPG,JPEG,PNG,MP4,WMV}`);
        list = list.map(item => {
            let info = path.parse(item);
            let {
                ext, // 扩展名
                name // 名称
            } = info;
            let file = {};
            file.url = item.replace(STATIC_PATH, '');
            file.name = `${name}${ext}`;
            file.ext = ext.replace('.', '');
            if (/\.(jpg|jpeg|png|JPG|JPEG|PNG)/.test(ext)) {
                file.type = 'img';
            } else if (/\.(mp4|wmv|MP4|WMV)/.test(ext)) {
                file.type = 'video';
            } else if (/\.(mp3|MP3)/.test(ext)) {
                file.type = 'audio';
            } else {
                file.type = 'others';
            }
            return file;
        });
        res.json({
            list: list
        });
    });
    // Give nuxt middleware to express
    app.use(nuxt.render)


    // Listen the server
    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}
start()
