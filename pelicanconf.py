#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import os
AUTHOR = 'Zak Espley'
SITENAME = 'Hyperfine Podcast Blog'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'America/Los_Angeles'

DEFAULT_LANG = 'English'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

MARKDOWN = {
    'extension_configs': {
        'mdx_math': {}
    }
}

STATIC_PATHS = ['images']
THEME="html5-dopetrope"
PLUGIN_PATHS=[str(os.path.join("C:\\", "Users", "Zak", "pelican-plugins"))]
print(PLUGIN_PATHS)
PLUGINS = ['pelican_javascript']
# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
