const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  console.log('\n -------------------- \n');
  console.log(name);
  console.log(email);
  console.log(password);
  console.log('\n -------------------- \n');

  if (name && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('\n -------------------- \n');
    console.log(response);
    console.log('\n -------------------- \n');

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);