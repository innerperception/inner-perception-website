AUTHOR = 'Inner Perception'
SITENAME = 'Inner Perception'
SITEURL = ""
SITE_DESCRIPTION = "Inner Perception is a post-hardcore band delivering intense, emotional music that pushes boundaries and explores the depths of human experience."

PATH = "content"

TIMEZONE = 'Europe/Prague'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Theme settings
THEME = 'themes/inner-perception'
CURRENT_YEAR = '2025'

# Social media links - same as Jekyll site
INSTAGRAM_USERNAME = 'innerperception'
APPLE_MUSIC_URL = 'https://music.apple.com/artist/innerperception'
SPOTIFY_ARTIST_ID = 'innerperception'
YOUTUBE_CHANNEL = 'https://www.youtube.com/@innerperception'
BANDCAMP_URL = 'https://innerperception.bandcamp.com'
FACEBOOK_USERNAME = 'innerperception'

# Import site content
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'content')))
from site_content import ABOUT_CONTENT, LIVE_SHOWS, CONTACT_CONTENT, ALBUMS, YOUTUBE_VIDEO

# Make site content available to templates
ABOUT = ABOUT_CONTENT
SHOWS = LIVE_SHOWS
CONTACT = CONTACT_CONTENT
ALBUMS_DATA = ALBUMS
YOUTUBE = YOUTUBE_VIDEO

# Music files
MUSIC_FILES = ['01_Mindscapes.mp3', '02_Forever.mp3', '03_Set_Me_Free.mp3']

# Static files
STATIC_PATHS = ['images', 'extra/robots.txt', 'extra/CNAME']
EXTRA_PATH_METADATA = {
    'extra/robots.txt': {'path': 'robots.txt'},
    'extra/CNAME': {'path': 'CNAME'},
}

# URL settings
ARTICLE_URL = '{slug}.html'
ARTICLE_SAVE_AS = '{slug}.html'
PAGE_URL = '{slug}.html'
PAGE_SAVE_AS = '{slug}.html'

# Disable unused features
AUTHOR_SAVE_AS = ''
CATEGORY_SAVE_AS = ''
TAG_SAVE_AS = ''
ARCHIVES_SAVE_AS = ''
AUTHORS_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''
TAGS_SAVE_AS = ''

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True
