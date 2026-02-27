import { createServer } from 'node:http';

const port = Number(process.env.PORT || 4000);

const adminUsers = [
  {
    id: 'admin-1',
    email: 'admin@tienda.com',
    password: 'Admin123*',
    role: 'admin',
    fullName: 'Administrador Principal'
  }
];

const clientUsers = [
  {
    id: 'client-1',
    email: 'cliente@tienda.com',
    password: 'Cliente123*',
    role: 'customer',
    fullName: 'Cliente Demo'
  }
];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function buildToken(user) {
  const tokenPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
    exp: Date.now() + 1000 * 60 * 60 * 2
  };

  return Buffer.from(JSON.stringify(tokenPayload)).toString('base64url');
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';

    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1e6) {
        reject(new Error('payload demasiado grande'));
      }
    });

    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('json inválido'));
      }
    });

    req.on('error', () => reject(new Error('error leyendo request')));
  });
}

async function handleLogin(req, res, users) {
  try {
    const body = await parseBody(req);
    const { email, password } = body;

    if (!email || !password) {
      return sendJson(res, 400, { error: 'email y password son obligatorios' });
    }

    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return sendJson(res, 401, { error: 'credenciales inválidas' });
    }

    return sendJson(res, 200, {
      accessToken: buildToken(user),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    return sendJson(res, 400, { error: error.message });
  }
}

const server = createServer(async (req, res) => {
  const { method, url } = req;

  if (method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  if (method === 'GET' && url === '/health') {
    return sendJson(res, 200, { status: 'ok' });
  }

  if (method === 'POST' && url === '/api/admin/login') {
    return handleLogin(req, res, adminUsers);
  }

  if (method === 'POST' && url === '/api/client/login') {
    return handleLogin(req, res, clientUsers);
  }

  return sendJson(res, 404, { error: 'ruta no encontrada' });
});

server.listen(port, () => {
  console.log(`Auth API escuchando en http://localhost:${port}`);
});
