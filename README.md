# How to run

```
$ docker build -t acsc-cowsay ./challenge
$ docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -e SPAWNER_IMAGE_NAME=acsc-cowsay -e SPAWNER_CONTAINER_PORT=3000 -p 5000:5000 --name container-spawner -it container-spawner
```