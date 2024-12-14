# Usa una imagen de Node.js como base
FROM node:22.11.0-alpine

# Establece el directorio de trabajo en la imagen
WORKDIR /usr/src

# Copia el package.json y package-lock.json a la imagen
COPY package*.json ./

# Copia el resto de los archivos del proyecto a la imagen
COPY . .

# Instala las dependencias
RUN npm install

# Contruye la app
RUN npm run build

# Expone el puerto en el que corre tu aplicación
EXPOSE 3000

# Start the application when the container is started
CMD ["npm", "run", "start"]