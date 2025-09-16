"""
Site content configuration file for Inner Perception website.
This file contains all the text content that appears on the site.
"""

# Hero section content
HERO_SECTION = {
    'enabled': True,  # Set to False to hide the entire Hero section
}

# About section content
ABOUT_CONTENT = {
    'main_text': 'Formed in 2023 by Martin and Georgi as a studio side project, Inner Perception has since evolved into a full live band, bringing a distinctive edge to the post-hardcore genre. Our songs feature shifting dynamics, textured instrumentation, and an underlying emotional pulse, creating a sound that’s both raw and intense but also melodic and emotional.',
    'band_members': 'The band currently consists of Ole (vocals), Martin (guitars,vocals), Honza (guitars), Georgi (bass) and Luca (drums).',
    'show_band_members': True  # Set to True to display band members info
}

# Live shows content
LIVE_SHOWS = [
    {
        'date': 'September 20, 2025',
        'venue': 'Klubovna, Prague',
        'ticket_url': 'https://fb.me/e/6qyLlXQh7'
    },
    {
        'date': 'September 21, 2025',
        'venue': 'Melodka, Brno',
        'ticket_url': 'https://fb.me/e/4ZYNMPHro'
    },
    {
        'date': 'November 20, 2025',
        'venue': 'Cross Club, Prague',
        'ticket_url': '#'
    }
]

# Contact section content
CONTACT_CONTENT = {
    'intro': 'Get in touch with us:',
    'email': 'booking@inner-perception.com',
    # 'booking_email': 'booking@inner-perception.com',
    # 'mailing_list_title': 'Subscribe to our mailing list',
    'social_intro': 'Follow us on social media:'
}

# Music section content
MUSIC_SECTION = {
    'enabled': False,  # Set to False to hide the entire Music section
}

# Coming Soon section content
COMING_SOON_SECTION = {
    'enabled': True,  # Set to False to hide the entire Coming Soon section
    'title': 'Coming Soon',
    'album_title': 'Voyage',
    'release_date': 'September 17, 2025',
    'description': 'Our debut album takes listeners on an emotional journey across twelve powerful songs that showcase our unique sound.',
    'album_cover': 'voyage-cover-front.jpg'
}

# Albums content (currently commented out in the template)
ALBUMS = [
    # {
    #     'title': 'Voyage',
    #     'release_date': 'September 2025',
    #     'description': 'Our debut EP explores the depths of human emotion through five powerful tracks that showcase our unique sound and technical abilities.',
    #     'image': 'album1.jpg',
    #     'spotify_url': 'https://open.spotify.com',
    #     'apple_music_url': 'https://music.apple.com'
    # }
    # {
    #     'title': 'Shattered Reflections',
    #     'release_date': 'October 2023',
    #     'description': 'Our latest single delves into themes of identity and self-discovery, featuring our most ambitious soundscape to date.',
    #     'image': 'album2.jpg',
    #     'spotify_url': 'https://open.spotify.com',
    #     'apple_music_url': 'https://music.apple.com'
    # }
]

# YouTube video section
YOUTUBE_VIDEO = {
    'enabled': False,  # Set to False to hide the entire section
    'url': 'https://youtu.be/TGIvO4eh190?si=8D60w5LEK4ZrwH4S',  # YouTube embed URL
    'title': 'Latest Music Video',
    'description': 'Check out our latest music video.'
}
