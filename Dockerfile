FROM node:lts-alpine as builder

ENV NODE_ENV production
ENV DISABLE_ESLINT_PLUGIN true

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only=production

RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]   