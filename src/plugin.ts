/********************************************************************************
 * Copyright (C) 2022  All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import * as codearts from '@codearts/plugin';
import { initNlsConfig } from '@cloudide/nls';
import { Plugin } from '@codearts/core/lib/node/plugin-api';
import { Backend } from './node/backend';

/**
 * Plugin activation entry point, this function is called when plugin is loaded.
 */
export function start(context: codearts.ExtensionContext) {

    /**
     *  Initialize language settings.
     */
    initNlsConfig(context.extensionPath);

    /**
     * The backend class that needs to be loaded, the classes in the array must inherit AbstractBackend.
     * Usually you only need to add the methods you want to expose to the frontend in the backen.ts and implement the plugin function in the run method.
     * If you want to define the backend class yourself, just refer to the implementation of the Backend class and add the type definition to the array.
     */
    const backends = [Backend];

    Plugin.create(context, undefined, backends);
}

/**
 * The method that is called when the plugin is stopped. 
 * If you need to customize the clean-up action that the plug-in stops, you can add it to the method.
 */
export function stop(context: codearts.ExtensionContext) {
    Plugin.getInstance().stop();
}
