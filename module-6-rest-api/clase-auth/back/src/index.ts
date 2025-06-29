import express from 'express';
import { createRestApiServer } from '#core/servers/index.js';
import { ENV, API_ROUTES } from '#core/constants/index.js';
import { jwtMiddleware, securityApi } from '#pods/security/index.js';
import { clientApi } from '#pods/client/index.js';
import { orderApi } from '#pods/order/index.js';

const app = createRestApiServer();
app.use(express.json());

app.use(API_ROUTES.SECURITY, securityApi);
/**
 * Securizar endpoints con jwtMiddleware. Ahora pide el token de autenticación
 * para ejecutar la operación. Sin ello, se puede acceder a los recursos sin
 * problema.
 */
app.use(API_ROUTES.CLIENTS, jwtMiddleware, clientApi);
app.use(API_ROUTES.ORDERS, jwtMiddleware, orderApi);

app.listen(ENV.PORT, () => {
  console.log(`Server running http://localhost:${ENV.PORT}`);
});
