# Music Files

This directory should contain the band's music files for the website's music player.

## Expected Files:
- 01_Mindscapes.mp3
- 02_Forever.mp3  
- 03_Set_Me_Free.mp3

## Setup Instructions:
1. Add your MP3 files to this directory
2. Update the `MUSIC_FILES` list in `pelicanconf.py` if you want to change the track listing
3. The music player will automatically generate a playlist from these files

## Notes:
- Music files are gitignored to keep the repository size manageable
- The player uses Plyr.js for a modern audio experience
- Track names are automatically formatted (underscores become spaces, .mp3 extension removed)
