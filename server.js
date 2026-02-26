require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 8084;

// Start server using the central app (with Swagger, routes, middleware)
app.listen(PORT, () => {
  console.log(`User Management API server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`User endpoints: http://localhost:${PORT}/api/users`);
  console.log(`Auth endpoints: http://localhost:${PORT}/api/auth`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});

module.exports = app;
