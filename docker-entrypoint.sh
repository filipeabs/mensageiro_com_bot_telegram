# colocar as 2 linhas em Dockerfile. E retirar daqui.
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ./docker-entrypoint.sh

# docker-entrypoint.sh for node.js

echo "wait db server"
dockerize -wait tcp://db:3306 -timeout 20s

echo "wait com server"
dockerize -wait tcp://com:3307 -timeout 20s