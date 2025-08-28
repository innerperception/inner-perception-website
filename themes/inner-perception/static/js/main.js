// Main JavaScript for Inner Perception website

document.addEventListener('DOMContentLoaded', function() {
  console.log('[Debug] DOMContentLoaded fired.'); // Log 1

  // --- Theme Toggle Logic ---
  initializeTheme();
  setupThemeToggle();

  // Get the fixed header element
  const header = document.querySelector('.site-header');
  const heroSection = document.querySelector('#hero');
  let headerHeight = 0;
  let heroHeight = 0;
  let isMobile = window.innerWidth <= 768;

  function updateLayout() {
    // Check if header exists before proceeding
    if (!header) {
        document.body.style.paddingTop = '0px'; // Reset if no header
        return; 
    }
    
    headerHeight = header.offsetHeight; // Get current header height
    
    // Only add padding if hero section doesn't exist or we're on mobile
    if (!heroSection) {
      document.body.style.paddingTop = `${headerHeight}px`; // Set body padding
    } else if (isMobile && window.innerWidth <= 480) {
      // On very small screens with a hero, add padding only after scrolling past hero
      if (window.scrollY > (heroHeight - headerHeight)) {
        document.body.style.paddingTop = `${headerHeight}px`;
      } else {
        document.body.style.paddingTop = '0px';
      }
    } else {
      document.body.style.paddingTop = '0px'; // No padding needed with hero section
      heroHeight = heroSection.offsetHeight;
    }
  }

  // Initial layout update
  updateLayout();

  // --- Scroll Effect Logic --- 
  function handleScroll() {
    if (!header) return; // Exit if header doesn't exist

    const scrollThreshold = 50; // Pixels scrolled before effect triggers
    
    // If we have a hero section, make header solid after scrolling past hero
    if (heroSection) {
      if (window.scrollY > (heroHeight - headerHeight)) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    } else {
      // Original behavior without hero section
      if (window.scrollY > scrollThreshold) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }
    
    // Update layout for mobile devices
    if (isMobile && heroSection) {
      updateLayout();
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once on load

  // --- ResizeObserver for dynamic body padding --- 
  if (header) {
    const resizeObserver = new ResizeObserver(() => {
      // Recalculate layout when header size changes
      updateLayout();
      handleScroll(); // Also update scroll effects
    });
    resizeObserver.observe(header);
  }
  
  if (heroSection) {
    const heroResizeObserver = new ResizeObserver(() => {
      // Recalculate hero height when it changes
      heroHeight = heroSection.offsetHeight;
      handleScroll(); // Update scroll effects
    });
    heroResizeObserver.observe(heroSection);
  }

  // Update layout on window resize
  window.addEventListener('resize', function() {
    isMobile = window.innerWidth <= 768;
    updateLayout();
    handleScroll();
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  
  if (mobileMenuToggle && siteNav) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      siteNav.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!siteNav.contains(e.target) && !mobileMenuToggle.contains(e.target) && siteNav.classList.contains('active')) {
        siteNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
  }

  // --- Plyr Playlist Logic --- 
  console.log('[Debug] Reaching Plyr logic section.'); // Log 2
  const playerElement = document.getElementById('player');
  const playlistElement = document.getElementById('playlist');

  if (playerElement && playlistElement && typeof Plyr !== 'undefined') {
    console.log('[Debug] Initializing Plyr player.'); // Log 3
    // Initialize Plyr
    const player = new Plyr(playerElement, {
      // Specify controls to exclude the settings button
      controls: [
        'play', 
        // 'play-large', // Optional: usually for video
        'progress', 
        'current-time', 
        'mute', 
        'volume', 
        // 'captions', // Exclude captions if not needed
        // 'settings', // Excluded!
        // 'pip', // Exclude Picture-in-Picture if not needed
        // 'airplay', // Exclude AirPlay if not needed
        // 'fullscreen' // Exclude fullscreen if not needed
      ]
    });
    console.log('[Debug] Plyr player object:', player); // Log 4

    const playlistItems = playlistElement.querySelectorAll('.playlist-item');
    console.log(`[Debug] Found ${playlistItems.length} playlist items.`); // Log 5

    function setActiveTrack(item) {
      playlistItems.forEach(i => i.classList.remove('active'));
      if (item) {
          item.classList.add('active');
      }
    }

    playlistItems.forEach((item, index) => {
      const button = item.querySelector('button');
      const trackSrc = item.getAttribute('data-track-src');
      console.log(`[Debug] Setting up listener for item ${index}, button: ${!!button}, src: ${trackSrc}`); // Log 6
      
      if(button && trackSrc) {
          button.addEventListener('click', () => {
            console.log(`[Debug] Click detected on button for: ${trackSrc}`); // Log 7
            try {
                console.log(`[Plyr Debug] Attempting to set source: ${trackSrc}`); // Log track source
                player.source = {
                  type: 'audio',
                  sources: [{
                    src: trackSrc,
                    type: 'audio/mp3',
                  }],
                };
                
                // player.play() returns a promise
                const playPromise = player.play();

                if (playPromise !== undefined) {
                  playPromise.then(_ => {
                    // Autoplay started!
                    console.log(`[Plyr Debug] Playback started successfully for: ${trackSrc}`);
                    setActiveTrack(item);
                  }).catch(error => {
                    // Autoplay was prevented.
                    console.error(`[Plyr Debug] Error playing ${trackSrc}:`, error);
                    // Attempt to set active track anyway, or provide user feedback
                    setActiveTrack(item); 
                  });
                } else {
                    // Handle older browsers or cases where play() doesn't return a promise
                    console.warn('[Plyr Debug] player.play() did not return a promise.');
                    setActiveTrack(item);
                }

            } catch (e) {
                console.error("[Plyr Debug] Error in click handler:", e);
            }
          });
      }
      
      // Load the first track by default
      if (index === 0 && trackSrc) {
          console.log(`[Debug] Loading default track: ${trackSrc}`); // Log 8
          player.source = {
              type: 'audio',
              sources: [{
                  src: trackSrc,
                  type: 'audio/mp3',
              }],
          };
          // Don't auto-play the first track, just load it
          setActiveTrack(item); 
      }
    });

    // Update active track on player events (optional but good UX)
    player.on('ended', () => {
        const currentActive = playlistElement.querySelector('.playlist-item.active');
        let nextItem = currentActive ? currentActive.nextElementSibling : null;
        // If no next sibling, loop back to the first
        if (currentActive && !nextItem) {
            nextItem = playlistItems[0];
        }
        if (nextItem && nextItem.classList.contains('playlist-item')) {
            nextItem.querySelector('button').click(); // Simulate click on next item
        } else {
             setActiveTrack(null); // Clear active state if no next item
        }
    });
    
    player.on('play', () => {
        const currentSrc = player.source?.sources?.[0]?.src;
        if (currentSrc) {
            const activeItem = playlistElement.querySelector(`.playlist-item[data-track-src="${currentSrc}"]`);
            setActiveTrack(activeItem);
        }
    });

  } else {
      console.error('[Debug] Failed Plyr setup checks:', {
          playerElementExists: !!playerElement,
          playlistElementExists: !!playlistElement,
          plyrLoaded: typeof Plyr !== 'undefined'
      }); // Log 9
  }
});

// Scroll to top function for logo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// --- Theme Toggle Functions ---
function initializeTheme() {
  // Check for saved theme preference or default to 'dark'
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  console.log(`[Theme] Initialized with theme: ${savedTheme}`);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  console.log(`[Theme] Switched from ${currentTheme} to ${newTheme}`);
  
  // Add a subtle animation effect
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
}

function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    console.log('[Theme] Theme toggle button initialized');
  } else {
    console.warn('[Theme] Theme toggle button not found');
  }
}
