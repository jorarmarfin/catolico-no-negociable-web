# Despliegue en Hetzner (Ubuntu)

Guía para desplegar este proyecto (Astro SSR, adapter `@astrojs/node`) en un VPS Ubuntu de Hetzner, con Node y PM2 ya instalados.

Dominio de ejemplo usado abajo: `fe.luisitomayta.com` (ajusta al tuyo).

## 0. Estado detectado (importante)

El dominio ya apunta al VPS pero actualmente sirve `dist/` como archivos estáticos crudos (se ve el listado `client/` y `server/`). Esto **no sirve** para una app SSR: falta el proceso Node corriendo `server/entry.mjs`, y además expone un listado de directorio público. Los pasos de abajo lo arreglan: nginx hace de reverse proxy hacia el proceso Node gestionado por PM2, no sirve `dist/` directamente.

## 1. Estructura en el servidor

```
/var/www/catolico-no-negociable/
├── current/          # symlink al release activo
├── releases/
│   └── 2026-09-01_1200/
│       ├── dist/
│       ├── node_modules/
│       └── package.json
└── shared/
    └── .env
```

Usar releases + symlink permite rollback instantáneo si un deploy falla.

```bash
sudo mkdir -p /var/www/catolico-no-negociable/{releases,shared}
sudo chown -R $USER:$USER /var/www/catolico-no-negociable
```

## 2. Variables de entorno

En el servidor, crear `/var/www/catolico-no-negociable/shared/.env` (nunca se commitea):

```bash
PUBLIC_API_URL=https://tu-api-laravel.com/api/v1
PUBLIC_SITE_URL=https://fe.luisitomayta.com
CATOLICO_API_TOKEN=<token de producción, distinto al de local>
HOST=127.0.0.1
PORT=4321
```

`HOST=127.0.0.1` evita exponer el proceso Node directamente a internet; nginx es el único punto de entrada público.

## 3. Build y despliegue (manual, primera vez)

Desde tu máquina local o directo en el servidor (clonando el repo):

```bash
RELEASE=/var/www/catolico-no-negociable/releases/$(date +%Y-%m-%d_%H%M)
mkdir -p $RELEASE
cd $RELEASE

git clone <tu-repo-url> .
# o: rsync -az --exclude node_modules --exclude .git ./ user@servidor:$RELEASE/

yarn install --immutable
yarn build          # genera dist/client y dist/server

ln -sfn /var/www/catolico-no-negociable/shared/.env $RELEASE/.env
ln -sfn $RELEASE /var/www/catolico-no-negociable/current
```

## 4. Ejecutar con PM2

El adapter `node` en modo `standalone` (ya configurado en `astro.config.mjs`) genera un servidor Node autocontenido en `dist/server/entry.mjs`.

```bash
cd /var/www/catolico-no-negociable/current

pm2 start dist/server/entry.mjs \
  --name catolico-no-negociable \
  --time \
  -- --host 127.0.0.1 --port 4321
```

Persistir entre reinicios del servidor:

```bash
pm2 save
pm2 startup   # ejecuta el comando que te imprime (systemd)
```

Comandos útiles:

```bash
pm2 status
pm2 logs catolico-no-negociable
pm2 restart catolico-no-negociable
```

## 5. nginx como reverse proxy

```bash
sudo apt install -y nginx
```

`/etc/nginx/sites-available/fe.luisitomayta.com`:

```nginx
server {
    listen 80;
    server_name fe.luisitomayta.com;

    location / {
        proxy_pass http://127.0.0.1:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Assets con hash en el nombre: cache larga
    location /_astro/ {
        proxy_pass http://127.0.0.1:4321;
        proxy_set_header Host $host;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

Activar y recargar:

```bash
sudo ln -s /etc/nginx/sites-available/fe.luisitomayta.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 6. HTTPS con Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d fe.luisitomayta.com
```

Certbot edita el bloque `server` para escuchar en 443 y renueva automáticamente vía timer systemd (`sudo systemctl status certbot.timer`).

## 7. Deploys posteriores

```bash
RELEASE=/var/www/catolico-no-negociable/releases/$(date +%Y-%m-%d_%H%M)
mkdir -p $RELEASE && cd $RELEASE

git clone <tu-repo-url> .
yarn install --immutable
yarn build

ln -sfn /var/www/catolico-no-negociable/shared/.env $RELEASE/.env
ln -sfn $RELEASE /var/www/catolico-no-negociable/current

pm2 restart catolico-no-negociable

# limpiar releases viejos, quedarse con los últimos 3
cd /var/www/catolico-no-negociable/releases
ls -1t | tail -n +4 | xargs -r rm -rf
```

### Rollback

```bash
ln -sfn /var/www/catolico-no-negociable/releases/<release-anterior> /var/www/catolico-no-negociable/current
pm2 restart catolico-no-negociable
```

## 8. Automatizar (opcional)

Guarda el bloque de "Deploys posteriores" como `deploy.sh` en el servidor, o arma un GitHub Actions que haga `ssh` + ese script en cada push a `main`.

## Checklist rápido

- [ ] `.env` de producción en `shared/.env` con token distinto al de local
- [ ] `HOST=127.0.0.1` — Node no expuesto directo a internet
- [ ] PM2 con `pm2 save` + `pm2 startup` configurado
- [ ] nginx como único punto de entrada (80/443)
- [ ] Certbot con renovación automática activa
- [ ] `dist/` deja de servirse como estático crudo (verificar que ya no aparezca el listado `Index of /`)
