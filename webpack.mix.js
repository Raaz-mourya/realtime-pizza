// webpack.mix.js

let mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js/app.js').setPublicPath('public/js/app.js');