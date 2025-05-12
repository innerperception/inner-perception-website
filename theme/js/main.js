// Main JavaScript for Inner Perception website

document.addEventListener('DOMContentLoaded', function() {
  console.log('[Debug] DOMContentLoaded fired.'); // Log 1

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
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Close mobile menu if it's open
      const mobileNav = document.querySelector('.site-nav');
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      
      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        if (mobileMenuToggle) {
          mobileMenuToggle.classList.remove('active');
        }
      }
      
      // Get the target element
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // For hero/top section, scroll to the very top
        if (targetId === '#hero') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else {
          // For other sections, scroll to the element
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
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

  // // Form submission handling
  // const contactForm = document.getElementById('contact-form');
  // if (contactForm) {
  //   contactForm.addEventListener('submit', function(e) {
  //     e.preventDefault();
      
  //     // In a real site, you would send the form data to a server
  //     // For this demo, we'll just show a success message
  //     const formData = new FormData(this);
  //     let formValues = {};
      
  //     for (let [key, value] of formData.entries()) {
  //       formValues[key] = value;
  //     }
      
  //     // Add animation class
  //     contactForm.classList.add('submitted');
      
  //     // Show success message
  //     const successMessage = document.createElement('div');
  //     successMessage.classList.add('success-message');
  //     successMessage.innerHTML = `<h3>Thanks for reaching out, ${formValues.name}!</h3><p>We'll get back to you as soon as possible.</p>`;
      
  //     // Replace form with success message
  //     contactForm.innerHTML = '';
  //     contactForm.appendChild(successMessage);
  //   });
  // }

  // // Mailing list subscription form handling
  // const subscribeForm = document.getElementById('subscribe-form');
  // if (subscribeForm) {
  //   subscribeForm.addEventListener('submit', function(e) {
  //     e.preventDefault();
      
  //     // Get the email input
  //     const emailInput = document.getElementById('subscribe-email');
  //     const email = emailInput.value.trim();
      
  //     if (email) {
  //       // Use MailerLite's API to subscribe the user
  //       if (typeof ml !== 'undefined') {
  //         // Show loading state
  //         const submitButton = subscribeForm.querySelector('button[type="submit"]');
  //         const originalButtonText = submitButton.textContent;
  //         submitButton.textContent = 'Subscribing...';
  //         submitButton.disabled = true;
          
  //         // Call MailerLite's subscribe function
  //         ml('webforms', 'subscribe', {
  //           webforms: {
  //             id: 'JwwrN4',
  //             email: email
  //           }
  //         }, function(response) {
  //           // Add animation class
  //           subscribeForm.classList.add('submitted');
            
  //           // Create success message
  //           const formGroup = subscribeForm.querySelector('.form-group');
  //           const successMessage = document.createElement('div');
  //           successMessage.classList.add('success-message');
            
  //           if (response.success) {
  //             successMessage.innerHTML = `<p>Thanks for subscribing! We've added <strong>${email}</strong> to our mailing list.</p>`;
  //           } else {
  //             // Handle errors (already subscribed, invalid email, etc.)
  //             successMessage.innerHTML = `<p>${response.error || 'Something went wrong. Please try again later.'}</p>`;
  //           }
            
  //           // Replace form with success message
  //           formGroup.innerHTML = '';
  //           formGroup.appendChild(successMessage);
  //         });
  //       } else {
  //         // Fallback if MailerLite script is not loaded
  //         // Add animation class
  //         subscribeForm.classList.add('submitted');
          
  //         // Create success message
  //         const formGroup = subscribeForm.querySelector('.form-group');
  //         const successMessage = document.createElement('div');
  //         successMessage.classList.add('success-message');
  //         successMessage.innerHTML = `<p>Thanks for subscribing! We've added <strong>${email}</strong> to our mailing list.</p>`;
          
  //         // Replace form with success message
  //         formGroup.innerHTML = '';
  //         formGroup.appendChild(successMessage);
  //       }
  //     }
  //   });
  // }
});
