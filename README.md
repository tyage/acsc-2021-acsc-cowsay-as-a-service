# COWSAY as a Service

```sh
$ docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -e SPAWNER_IMAGE_NAME=acsc-cowsay -e SPAWNER_CONTAINER_PORT=3000 -p 5000:5000 ghcr.io/tyage/container-spawner:latest
```

```sh
$ docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -e SPAWNER_IMAGE_NAME=acsc-cowsay ghcr.io/tyage/container-spawner-cleaner:latest
```