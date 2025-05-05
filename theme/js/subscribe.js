document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('subscribe-email');
  const subscribeButton = document.getElementById('subscribe-button');
  const successMessage = document.getElementById('form-success');
  const errorMessage = document.getElementById('form-error');
  const subscribedEmailSpan = document.getElementById('subscribed-email');

  // Hide messages initially
  if (successMessage) successMessage.style.display = 'none';
  if (errorMessage) errorMessage.style.display = 'none';

  if (form) {
    // Handle form submission
    form.addEventListener('submit', function(e) {
      // Hide any existing messages
      if (successMessage) successMessage.style.display = 'none';
      if (errorMessage) errorMessage.style.display = 'none';

      // Validate email
      const email = emailInput.value.trim();
      if (!email || !isValidEmail(email)) {
        e.preventDefault(); // Prevent form submission
        errorMessage.textContent = 'Please enter a valid email address.';
        errorMessage.style.display = 'block';
        return false;
      }

      // Update the email in the success message
      if (subscribedEmailSpan) {
        subscribedEmailSpan.textContent = email;
      }

      // Show loading state
      subscribeButton.disabled = true;
      subscribeButton.textContent = 'Subscribing...';

      // We'll use a timeout to simulate the form submission
      // since Airform will redirect to its own success page
      // This allows us to show our custom success message
      setTimeout(function() {
        // Store the email in localStorage so we can show it after redirect
        localStorage.setItem('subscribedEmail', email);
      }, 100);

      // Let the form submit normally to Airform
      return true;
    });
  }

  // Check if we're returning from a form submission
  window.addEventListener('load', function() {
    // Check URL parameters for Airform success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success') && urlParams.get('success') === 'true') {
      // Get the email from localStorage
      const email = localStorage.getItem('subscribedEmail');
      
      // Show success message
      if (subscribedEmailSpan && email) {
        subscribedEmailSpan.textContent = email;
      }
      successMessage.style.display = 'block';
      
      // Clean up localStorage
      localStorage.removeItem('subscribedEmail');
      
      // Remove the success parameter from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    }
  });

  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
