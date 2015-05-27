/**
 * User: daletan
 * Date: 5/25/15
 * Time: 4:57 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var findNamespaceValue = require('find-namespace-value');

/**
 * Expose `plugin`.
 */
module.exports = plugin;

/**
 * Append or prepend the site metadata title to the page title based off of the metadata object.
 *
 * @param {object} options
 * @param {string} options.separator A string to separate the page title from the site metadata title, defaults to ' | '
 * @param {string} options.namespace The key or nested keys to search for based off of the metadata object, defaults to 'site.title'
 * @param {string} options.ns Synonym for options.namespace
 * @param {boolean} options.prepend Prepend the site metadata title? Defaults to false
 * @returns {Function}
 */
function plugin(options) {
    options = normalize(options);
    var separator = options.separator || ' | ';
    var namespace = options.ns || options.namespace || 'site.title';
    var prepend = !!options.prepend;
    return function(files, metalsmith, done) {
        var metadata = metalsmith.metadata();
        var siteTitle = findNamespaceValue(namespace, metadata);
        if (siteTitle) {
            Object.keys(files).forEach(function (key) {
                var file = files[key];
                if (!file.pageTitle) {
                    file.pageTitle = orderTitle(siteTitle, file.title, separator, prepend);
                }
            });
        }
        return done();
    }
}

/**
 *
 * @param {string} siteTitle
 * @param {string} pageTitle
 * @param {string} separator
 * @param {boolean} prepend
 */
function orderTitle(siteTitle, pageTitle, separator, prepend) {
    var ret;
    if (prepend) {
        // put the siteTitle first
        ret = [siteTitle, separator, pageTitle];
    } else {
        ret = [ pageTitle, separator, siteTitle];
    }

    return ret.join('');
}

/**
 * Make sure the plugin options param is an object, otherwise return an empty one
 * @param {object} [options]
 * @returns {object}
 */
function normalize(options) {
    // just want to check if it is an object
    if (options && Object.keys(options).length) {
        return options;
    }
    return {};
}
