const apiBase = 'http://localhost:4000';

const form = document.getElementById('login-form');
const result = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  result.textContent = 'Validando credenciales...';
  result.className = 'result';

  try {
    const response = await fetch(`${apiBase}/api/client/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'No fue posible iniciar sesión');
    }

    localStorage.setItem('client_access_token', data.accessToken);
    result.textContent = `Bienvenido ${data.user.fullName}. Token guardado en localStorage.`;
    result.className = 'result success';
  } catch (error) {
    result.textContent = error.message;
    result.className = 'result error';
  }
});
