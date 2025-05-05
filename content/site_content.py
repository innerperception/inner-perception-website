"""
Site content configuration file for Inner Perception website.
This file contains all the text content that appears on the site.
"""

# About section content
ABOUT_CONTENT = {
    'main_text': 'Formed in 2023, Inner Perception brings a fresh voice to the music scene. With their intense energy and unique blend of post-hardcore with melodic hardcore influences, Inner Perception create soundscapes that are both powerful and memorable. The band\'s music is characterized by dynamic arrangements and soulful melodies, resulting in tracks that leave a lasting impression on listeners.',
    'band_members': 'The band consists of Martin (guitars,vocals), Honza (guitar), George (bass). Together, we create music that explores themes of personal growth, and the human experience.',
    'show_band_members': False  # Set to True to display band members info
}

# Live shows content
LIVE_SHOWS = [
    {
        'date': 'May 15, 2025',
        'venue': 'The Echo Lounge, Prague',
        'ticket_url': 'https://goout.to/innerperception'
    },
    {
        'date': 'June 19, 2025',
        'venue': 'Some festival, Prague',
        'ticket_url': 'https://goout.to/innerperception'
    },
    {
        'date': 'July 8, 2025',
        'venue': 'Some festival, Prague',
        'ticket_url': 'https://goout.to/innerperception'
    },
    {
        'date': 'September 20, 2025',
        'venue': 'Klubovna, Prague',
        'ticket_url': 'https://goout.to/innerperception'
    }
]

# Contact section content
CONTACT_CONTENT = {
    'intro': 'Get in touch with us:',
    'email': 'info@inner-perception.com',
    'booking_email': 'booking@inner-perception.com',
    'mailing_list_title': 'Subscribe to our mailing list',
    'social_intro': 'Follow us on social media:'
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
