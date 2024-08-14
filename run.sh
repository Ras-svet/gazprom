#!/bin/bash

# Остановите и удалите контейнер, если он существует
if [ "$(docker ps -aq -f name=my-web-app-container)" ]; then
    docker stop my-web-app-container
    docker rm my-web-app-container
fi

# Запустите новый контейнер
docker run -d -p 8085:8085 --name my-web-app-container my-web-app