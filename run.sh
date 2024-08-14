#!/bin/bash

# Остановите и удалите контейнер, если он существует
docker stop my-web-app-container 2>/dev/null || true && docker rm my-web-app-container 2>/dev/null || true

# Запустите новый контейнер
docker run -d -p 8085:8085 --name my-web-app-container my-web-app
