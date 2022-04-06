FROM node:16 AS builder

# set working directory
WORKDIR /app


# install app dependencies
COPY package.json ./

# Installs all node packages
RUN npm install 


# Copies everything over to Docker environment
COPY . ./

RUN npm run build

#Stage 2
#######################################
#pull the official nginx:1.19.0 base image
FROM nginx:alpine
#!/bin/sh


## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# #copies React to the container directory
# # Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# # Remove default nginx static resources
# RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=builder /app/build /usr/share/nginx/html
# # Containers run nginx with global directives and daemon off
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
COPY nginx.conf /etc/nginx/conf.d/configfile.template


ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"