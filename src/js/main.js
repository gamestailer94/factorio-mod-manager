'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import logger from 'winston';
import path from 'path';
const { app } = require('electron').remote;
import {autorunAsync, observable} from "mobx";

window.storage = require('electron-storage');
const loggerConfig = {
    transports: [
        new logger.transports.File({
            filename: path.join(app.getPath('userData'),'app.log'),
            maxsize: 2048,
            json: false,
            maxFiles: 5,
            tailable: true,
            zippedArchive: true,
            label: "Render"
        })
    ],
    exitOnError: false
};

if(process.env.NODE_ENV === 'production'){
    loggerConfig.transports[0].humanReadableUnhandledException = true;
    loggerConfig.transports[0].handleExceptions = true;
}

logger.Logger(loggerConfig);
window.logger = logger;
window.logger.oldError = window.logger.error;

window.logger.error = (err) => {
    console.log(err);
    window.logger.oldError(err);
};

import Page from './js/tpl/Page'
import Profiles from './js/model/Profiles'
import Config from './js/model/Config'

let config = new Config();
let profiles = window.profiles = observable( new Profiles());

profiles.loadProfiles()
    .then(()=>{
        autorunAsync(() => {
            window.storage.set('profiles', profiles).catch(window.logger.error);
        },500);
    })
    .then(() => {
    ReactDOM.render(
        <Provider profiles={profiles} config={config}>
            <Page/>
        </Provider>
        , document.getElementById('root'));
});
