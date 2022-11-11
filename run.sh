~/reclaim_docker_storage.sh

docker container stop blockchain-explorer
docker container rm blockchain-explorer
docker image rm --force ndau/blockchain-explorer:latest

docker buildx create --name m1builder
docker buildx use m1builder
docker buildx inspect --bootstrap
docker buildx build --push -t ndau/blockchain-explorer:latest --platform=linux/amd64 .
docker run -v /Users/vietle/go/src/github.com/ndau/blockchain-explorer/nginx/nginx.conf:/etc/nginx/nginx.conf \
  -e DEVELOPMENT=true \
	--publish 8080:80 \
	--name blockchain-explorer ndau/blockchain-explorer:latest 

# REACT_APP_SERVICE_ENDPOINT=https://dev.explorer-backend.ndau.tech npm run start
