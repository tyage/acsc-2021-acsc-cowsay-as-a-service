# COWSAY as a Service

## Deployment

.env-spawner
```
SPAWNER_IMAGE_NAME=acsc-cowsay
SPAWNER_TIME_LIMIT=600
SPAWNER_CONTAINER_PORT=3000
RECAPTCHA_PUBLIC_KEY=...
RECAPTCHA_PRIVATE_KEY=...
```

.env-cleaner
```
SPAWNER_IMAGE_NAME=acsc-cowsay
SPAWNER_TIME_LIMIT=600
```

command
```sh
$ docker build -t acsc-cowsay ./challenge
$ docker compose up
```
