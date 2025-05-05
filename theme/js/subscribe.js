document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('subscribe-email');
  const subscribeButton = document.getElementById('subscribe-button');
  const successMessage = document.getElementById('form-success');
  const errorMessage = document.getElementById('form-error');

  if (form && subscribeButton) {
    subscribeButton.addEventListener('click', function() {
      // Hide any existing messages
      successMessage.style.display = 'none';
      errorMessage.style.display = 'none';

      // Validate email
      const email = emailInput.value.trim();
      if (!email || !isValidEmail(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        errorMessage.style.display = 'block';
        return;
      }

      // Use Formbricks to track the subscription event
      if (window.formbricks) {
        try {
          // Track the subscription event
          window.formbricks.track('newsletter_subscribe', {
            email: email
          });

          // Show success message
          form.reset();
          successMessage.style.display = 'block';
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 5000); // Hide after 5 seconds
        } catch (error) {
          console.error('Formbricks error:', error);
          errorMessage.textContent = 'Something went wrong. Please try again.';
          errorMessage.style.display = 'block';
          setTimeout(() => {
            errorMessage.style.display = 'none';
          }, 5000); // Hide after 5 seconds
        }
      } else {
        // Fallback if Formbricks is not loaded
        console.error('Formbricks not loaded');
        errorMessage.textContent = 'Subscription service is not available. Please try again later.';
        errorMessage.style.display = 'block';
      }
    });
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
