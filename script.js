document.addEventListener('DOMContentLoaded', () => {

  // --- Menu Toggle for Mobile ---
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active'); // Toggle visibility
      const isExpanded = nav.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      // Optional: Change hamburger icon to 'X' when open
      menuToggle.textContent = isExpanded ? '✕' : '☰';
    });
  }

  // --- Simple Welcome Alert on Homepage ---
  // Check if on the root path or index.html explicitly
  if (window.location.pathname === '/blog-website/' || window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
     // Uncomment the line below if you want the alert
     // alert("Welcome to My Awesome Blog!");
     console.log("Welcome alert skipped (uncomment in script.js to enable).");
  }

  // --- Contact Form Validation ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      clearErrors(); // Clear previous errors
      formStatus.textContent = ''; // Clear previous status message
      formStatus.className = ''; // Reset status class

      let isValid = true;

      // Get form fields
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      // Validate Name
      if (nameInput.value.trim() === '') {
        showError('nameError', 'Name is required.', nameInput);
        isValid = false;
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value.trim() === '') {
        showError('emailError', 'Email is required.', emailInput);
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        showError('emailError', 'Please enter a valid email address.', emailInput);
        isValid = false;
      }

      // Validate Message
      if (messageInput.value.trim() === '') {
        showError('messageError', 'Message cannot be empty.', messageInput);
        isValid = false;
      }

      // If form is valid
      if (isValid) {
        console.log('Form is valid. Submitting (simulated)...');
        console.log('Name:', nameInput.value.trim());
        console.log('Email:', emailInput.value.trim());
        console.log('Message:', messageInput.value.trim());

        // Simulate form submission success
        formStatus.textContent = 'Thank you for your message! (Submission Simulated)';
        formStatus.className = 'success'; // Add success class for styling
        contactForm.reset(); // Clear the form fields
      } else {
        console.log('Form validation failed.');
        formStatus.textContent = 'Please correct the errors above.';
        formStatus.className = 'error'; // Add error class for styling
      }
    });
  }

  // Helper function to display errors
  function showError(errorElementId, message, inputElement) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block'; // Show the error message
    }
    if (inputElement) {
        inputElement.classList.add('invalid'); // Add invalid class for styling
    }
  }

  // Helper function to clear errors
  function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.textContent = '';
        msg.style.display = 'none'; // Hide the error message
    });

    const invalidInputs = document.querySelectorAll('.invalid');
    invalidInputs.forEach(input => input.classList.remove('invalid'));
  }

  // --- Dark Mode Toggle ---

  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
      // Check for saved preference
      if (localStorage.getItem('darkMode') === 'enabled') {
          document.body.classList.add('dark-mode');
      }

      darkModeToggle.addEventListener('click', () => {
          document.body.classList.toggle('dark-mode');

          // Save preference
          if (document.body.classList.contains('dark-mode')) {
              localStorage.setItem('darkMode', 'enabled');
          } else {
              localStorage.removeItem('darkMode');
          }
      });
  }


}); // End DOMContentLoaded
