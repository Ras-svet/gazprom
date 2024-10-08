# Используйте официальный образ Node.js как базовый образ
FROM node:18

# Установите рабочую директорию в контейнере
WORKDIR /usr/src/app

# Копируйте package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте все файлы приложения в рабочую директорию
COPY . .

# Соберите приложение, если это необходимо
# RUN npm run build

# Откройте порт, на котором будет работать ваше приложение
EXPOSE 8085

# Команда для запуска приложения
CMD ["npm", "start"]