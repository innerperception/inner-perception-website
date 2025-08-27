"""
Site content configuration file for Inner Perception website.
This file contains all the text content that appears on the site.
"""

# About section content
ABOUT_CONTENT = {
    'main_text': 'Formed in 2023, Inner Perception bring a distinctive edge to the post-hardcore genre. Their songs feature shifting dynamics, textured instrumentation, and an underlying emotional pulse, creating a sound that’s both intense and enduring.',
    'band_members': 'The band consists of Martin (guitars,vocals), Honza (guitar), George (bass). Together, we create music that explores themes of personal growth, and the human experience.',
    'show_band_members': False  # Set to True to display band members info
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
