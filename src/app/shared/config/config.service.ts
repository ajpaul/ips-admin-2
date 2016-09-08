import { Injectable } from '@angular/core';
import { Config } from './config.class';

@Injectable()
export class ConfigService{
    constructor(){
        this.initConfig();
    }

    config: Config;

    getConfig(): Config {
        return this.config;
    }

    /**
     * Load the config with an existing Config object
     * 
     * @param {Config} config
     */
    loadConfig(config: Config) {
        this.config = config;
    }

    initConfig() {
        this.config = new Config();
        // hardcoding this in the config initialization until
        // we come up with a way to load the initial config
        // from another option, like a json config file or
        // from environment variables
        this.config.apiRoot = 'http://localhost:8080';
        this.config.usersEndpoint = '/api/user';
        this.config.orgUsersEndpoint = '/api/user/orgID/';
        this.config.tenantId = 123;
    }

}
