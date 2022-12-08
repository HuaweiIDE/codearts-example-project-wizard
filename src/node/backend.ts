/********************************************************************************
 * Copyright (C) 2022  All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import * as codearts from '@codearts/plugin';
import { exposable, expose } from '@cloudide/messaging';
import { LogLevel, WebviewOptions } from '@codearts/core/lib/common/plugin-common';
import { AbstractBackend } from '@codearts/core/lib/node/plugin-api';

/**
 * Add your backend api in this class
 * Using '@expose' to expose your function to frontend
 */
@exposable
export class Backend extends AbstractBackend {

    /**
     * function call to the backend will wait until init() to be resolved
     */
    async init(): Promise<void> {

    }

    /**
     * Entry of your plugin backend
     * In this function you can call function exposed by frontend 
     */
    public async run(): Promise<void> {
        const opts: WebviewOptions = {
            viewType: 'view_type_of_your_plugin_view',
            title: this.plugin.localize('plugin.index.title'),
            targetArea: 'left',
            iconPath: 'resources/icons/plugin.svg',
            viewUrl: 'local:resources/page/index.ejs',
            preserveFocus: true,
            templateEngine: 'ejs'
        };
        this.plugin.registerProjectWizardProvider(opts);
    }

    public stop(): void {

    }

    /**
     * this function can be called from plugin frontend as below:
     * @example
     * ```
     * plugin.call('your_backend_function_identifier', 'world').then(ret => {
     *     console.log(ret);
     * });
     * 
     * ```
     */
    @expose('your_backend_function_identifier')
    public doSomething(name: string): boolean {
        codearts.window.showInformationMessage(`hello ${name}!`);
        return true;
    }

}
