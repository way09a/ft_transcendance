all:
	@docker compose -f ./docker-compose.yml up -d --build
	@docker compose -f ./docker-compose.yml logs -f

down:
	@docker compose -f ./docker-compose.yml down

up:
	@docker compose -f ./docker-compose.yml up -d --build
	@docker compose -f ./docker-compose.yml logs -f

stop:
	@docker stop $$(docker ps)

remove_con:
	@docker rm -f $$(docker ps -a -q)

remove_images:
	@docker image prune --all --force

re:
	@make down
	@make up

clean:
	-docker stop $$(docker ps -qa)
	-docker rm $$(docker ps -qa)
	-docker rmi -f $$(docker images -qa)
	-docker volume rm $$(docker volume ls -q)
	-docker network rm $$(docker network ls -q)

db_psql:
	@make all
	@docker compose exec db psql -U postgres -d mydatabase -c '\dt'

.PHONY: all clean fclean re