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

STATIC_PATHS = ['images', 'css/fonts']
PLUGIN_PATHS=[str(os.path.join("C:\\", "Users", "Zak", "pelican-plugins"))]
PLUGINS = ['pelican_javascript']

# Nest Settings
THEME="nest"
SITESUBTITLE = "Podcast Blog"
NEST_HEADER_IMAGES = "Hyperfine-Blank-BG.png"
NEST_HEADER_LOGO = 'images/Logo4.png'
NEST_INDEX_HEADER_TITLE = "hyperfine"
# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True
