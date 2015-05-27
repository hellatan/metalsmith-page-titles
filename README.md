# Metalsmith Page Titles

[![Build Status](https://travis-ci.org/hellatan/metalsmith-page-titles.svg?branch=master)](https://travis-ci.org/hellatan/metalsmith-page-titles)

Gives your Metalsmith build the ability to add a global site title to the page title based on your markdown frontmatter and Metalsmith metadata

## Installation

```bash
npm install --save-dev metalsmith-page-titles
```

## Usage

In your markdown Frontmatter:
```md
---
title: My Specific Page Title
---
```

JavaScript API:

```js
var Metalsmith = require('metalsmith');
var pageTitles = require('metalsmith-page-titles');

Metalsmith
    .metadata({
        site: {
            title: "My Main Site Title"
        }
    })
    .use(pageTitles())
```

In your template:

```html
<title>{{ pageTitle }}</title>
```

Will result in `<title>My Specific Page Title | My Main Site Title</title>`

## options

### separator 

String - A string to separate the page title from the site metadata title, defaults to ' | '

### namespace
 
String - The key or nested keys to search for based off of the metadata object, defaults to 'site.title'
 
### ns

See namespace

### prepend

Boolean - Prepend the site metadata title? Defaults to false

## Notes

The metalsmith cli workflow has not been tested
