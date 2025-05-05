document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('subscribe-form');
  const successMessage = document.getElementById('form-success');
  const errorMessage = document.getElementById('form-error');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission

      // Hide any existing messages
      successMessage.style.display = 'none';
      errorMessage.style.display = 'none';

      // Get form data
      const formData = new FormData(form);
      
      // Submit the form data to Formspree
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
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
          response.json().then(data => {
            if (data && data.errors) {
              console.error('Formspree errors:', data.errors);
            }
            errorMessage.style.display = 'block';
            setTimeout(() => {
              errorMessage.style.display = 'none';
            }, 5000); // Hide after 5 seconds
          });
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
    });
  }
});
