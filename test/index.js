/**
 * User: daletan
 * Date: 5/25/15
 * Time: 8:03 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var assert = require('assert');
var Metalsmith = require('metalsmith');
var pageTitles = require('..');

var DEFAULT_SITE_TITLE = 'Metalsmith Site Titles';

var defaultMetaData = {
    site: {
        title: DEFAULT_SITE_TITLE
    }
};

describe('metalsmith-page-titles', function () {
    var M;
    beforeEach(function () {
        M = Metalsmith('test/fixtures')
            .metadata(defaultMetaData)
    });
    describe('default metadata options', function () {
        it('should create page titles based on default settings', function (done) {
            M.use(pageTitles())
                .build(function (err, files) {
                    if (err) {
                        return done(err);
                    }
                    assert.equal('Page title | ' + DEFAULT_SITE_TITLE, files['page.md'].pageTitle);
                    done();
                });
        });

        it('should create prepended page titles', function (done) {
            M.use(pageTitles({
                    prepend: true
                }))
                .build(function (err, files) {
                    if (err) {
                        return done(err);
                    }
                    assert.equal(DEFAULT_SITE_TITLE + ' | Page title', files['page.md'].pageTitle);
                    done();
                });
        });

        it('should create a title with a different separator', function (done) {
            M.use(pageTitles({
                    separator: ' ~ '
                }))
                .build(function (err, files) {
                    if (err) {
                        return done(err);
                    }
                    assert.equal('Page title ~ ' + DEFAULT_SITE_TITLE, files['page.md'].pageTitle);
                    done();
                });
        });

    });
    describe('namespace option', function () {
        var metadata = {
            different: {
                name: {
                    space: DEFAULT_SITE_TITLE
                }
            }
        };
        var namespace = 'different.name.space';
        it('should use the `namespace` option', function (done) {
            M.metadata(metadata)
                .use(pageTitles({
                    namespace: namespace
                }))
                .build(function (err, files) {
                    if (err) {
                        return done(err);
                    }
                    assert.equal('Page title | ' + DEFAULT_SITE_TITLE, files['page.md'].pageTitle);
                    done();
                });
        });
        it('should use the `ns` option', function (done) {
            M.metadata(metadata)
                .use(pageTitles({
                    ns: namespace
                }))
                .build(function (err, files) {
                    if (err) {
                        return done(err);
                    }
                    assert.equal('Page title | ' + DEFAULT_SITE_TITLE, files['page.md'].pageTitle);
                    done();
                });
        });
    });
    it('should NOT create pageTitle property', function (done) {
        M.metadata({})
            .use(pageTitles())
            .build(function (err, files) {
                if (err) {
                    return done(err);
                }
                assert.equal(typeof files['page.md'].pageTitle, 'undefined');
                done();
            });
    })
});
