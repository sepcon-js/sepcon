import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import config from './webpack.config';
import open from 'open';

/* eslint-disable no-console */

const compiler = webpack(config);

const server = new WebpackDevServer(compiler);

server.listen(config.devServer.port);

function loadSrc(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
};


server.app.get('*', loadSrc);