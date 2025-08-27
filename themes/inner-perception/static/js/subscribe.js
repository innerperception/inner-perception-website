document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('subscribe-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission
      
      const email = document.getElementById('subscribe-email').value.trim();
      const button = document.getElementById('subscribe-button');
      const successDiv = document.getElementById('success');
      const errorDiv = document.getElementById('error');
      
      // Clear previous messages
      successDiv.innerHTML = '';
      errorDiv.innerHTML = '';
      
      // Basic email validation
      if (!email || !isValidEmail(email)) {
        errorDiv.innerHTML = "<div class='alert alert-danger'>Please enter a valid email address.</div>";
        return;
      }
      
      // Show loading state
      button.disabled = true;
      button.textContent = 'Subscribing...';
      
      // Submit via AJAX to Formspree
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Success message
          successDiv.innerHTML = "<div class='alert alert-success'>" +
            "<strong>Thanks for subscribing!</strong> We've added " + email + " to our mailing list." +
            "</div>";
          
          // Clear form
          form.reset();
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            successDiv.innerHTML = '';
          }, 5000);
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        errorDiv.innerHTML = "<div class='alert alert-danger'>" +
          "<strong>Sorry!</strong> Something went wrong. Please try again later." +
          "</div>";
        
        // Hide error message after 5 seconds
        setTimeout(() => {
          errorDiv.innerHTML = '';
        }, 5000);
      })
      .finally(() => {
        // Reset button state
        button.disabled = false;
        button.textContent = 'Subscribe';
      });
    });
  }
});

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
