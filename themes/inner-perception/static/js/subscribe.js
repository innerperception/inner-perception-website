document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('subscribe-form');
  const successMessage = document.getElementById('form-success');
  const errorMessage = document.getElementById('form-error');

  if (form) {
    form.addEventListener('submit', function(e) {
      // For Netlify Forms, we don't need to prevent default
      // as Netlify will handle the submission

      // Hide any existing messages
      successMessage.style.display = 'none';
      errorMessage.style.display = 'none';

      // Netlify will handle the form submission and redirect
      // This code will only run if JavaScript is enabled and
      // we want to show a custom message instead of redirecting

      // We'll add a hidden field to detect if the form was submitted via AJAX
      const formData = new FormData(form);
      formData.append('ajax-submit', 'true');

      // Submit the form data using fetch
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(response => {
        if (response.ok) {
          // Show success message
          form.reset();
          successMessage.style.display = 'block';
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 5000); // Hide after 5 seconds
        } else {
          // Show error message
          errorMessage.style.display = 'block';
          setTimeout(() => {
            errorMessage.style.display = 'none';
          }, 5000); // Hide after 5 seconds
        }
      })
      .catch(error => {
        // Show error message
        console.error('Error:', error);
        errorMessage.style.display = 'block';
        setTimeout(() => {
          errorMessage.style.display = 'none';
        }, 5000); // Hide after 5 seconds
      });

      // Prevent the default form submission
      e.preventDefault();
    });
  }
});
