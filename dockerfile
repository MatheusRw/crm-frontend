# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copiar os arquivos de build para o nginx
COPY --from=build /app/build /usr/share/nginx/html

# Configuração para SPA (React Router) - CORREÇÃO AQUI
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Garantir que a pasta de configuração existe
RUN mkdir -p /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]