default: app-shell

# Variables
DOCKER_COMPOSE_V1_EXIT_CODE=$(shell docker-compose >/dev/null 2>&1; echo $$?)

# Targets
app-shell:
	docker exec -it app sh

gateway-shell:
	docker exec -it gateway sh

up:
	$(call compose,up,-d)

up-rebuild:
	$(call compose,up,-d --build)

down:
	$(call compose,down)

stop:
	$(call compose,stop)

app-logs:
	$(call compose,logs,-f app)

gateway-logs:
	$(call compose,logs,-f gateway)

install:
	docker exec -it app pnpm install

clean:
	rm -rf ./node_modules
	rm -rf ./.next
	rm -rf ./.turbo
	find ./apps -type d -name "node_modules" -maxdepth 2 -exec rm -r {} +
	find ./apps -type d -name ".next" -maxdepth 2 -exec rm -r {} +
	find ./apps -type d -name ".turbo" -maxdepth 2 -exec rm -r {} +
	find ./packages -type d -name "node_modules" -maxdepth 2 -exec rm -r {} +
	find ./packages -type d -name ".next" -maxdepth 2 -exec rm -r {} +
	find ./packages -type d -name ".turbo" -maxdepth 2 -exec rm -r {} +

# Functions
define colorecho
      @tput setaf $2
      @echo $1
      @tput sgr0
endef

define compose
	if [ "$(DOCKER_COMPOSE_V1_EXIT_CODE)" = "0" ]; then\
		docker-compose $1 $2 $3;\
	else\
		docker compose $1 $2 $3;\
	fi
endef
