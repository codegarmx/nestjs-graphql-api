FROM node:alpine AS base

# --- Development --- #
FROM base AS development

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .

USER node