# can be overridden at runtime eg. `make build runner=grunt`
runner=gulp

help:
	@echo "fe-skeleton"
	@echo ""
	@echo "The following commands are available:"
	@echo ""
	@echo "\tmake setup - Installs node dependencies and requisites for build"
	@echo "\tmake build - Triggers a compilation via preferred task runner"
	@echo "\tmake watch - Triggers a watcher via preferred task runner"
	@echo "\tmake test - Triggers test run via preferred task runner"
	@echo ""
	@echo ""
	@echo "Docker based building is also available:"
	@echo ""
	@echo "\tmake docker-build - Trigger 'make build' via docker" 
	@echo "\tmake docker-watch - Trigger 'make watch' via docker" 
	@echo "\tmake docker-test - Trigger 'make test' via docker" 

default: help

build: node_modules
	$(runner) build;

watch: node_modules
	$(runner);

test: node_modules
	$(runner) test;

# just install node_modules, also callable as `make node_modules`
setup: node_modules

# backwards compatibility
fe-setup: build

# this only runs if the modification date of `package.json` is more recent
# than the modification date of `node_modules`, `touch $@` updates the
# modification date of `node_modules` when done.
node_modules: package.json
	npm cache clean;
	npm install;
	touch $@


# Variables for docker based building
IMAGE_NAME = fe-skeleton
BASE_CONTAINER_NAME = $(IMAGE_NAME)-$(runner)

# use a target flag file (.dockerbuild) so image is only rebuilt when
# Dockerfile has been changed more recently than last build
.dockerbuild: Dockerfile
	-docker rm $(BASE_CONTAINER_NAME)-build
	-docker rm $(BASE_CONTAINER_NAME)-watch
	-docker rm $(BASE_CONTAINER_NAME)-test
	docker build -t $(IMAGE_NAME) .
	touch $@

# Here we check if a container with the correct name already exists and if
# it does we run it again. Otherwise we run a new one and have it call
# `make run runner=$(runner)`
docker-build: .dockerbuild
	@EXISTS=$$(docker ps -a | grep "$(BASE_CONTAINER_NAME)-build" | awk '{ print $$1 }'); \
	if [ $$EXISTS ]; then \
		echo "Reusing existing container..."; \
		docker start -ai $$EXISTS; \
	else \
		echo "Running a new container..."; \
		docker run \
			-ti \
			--name $(BASE_CONTAINER_NAME)-build \
			-v $(CURDIR):/src \
			$(IMAGE_NAME) \
			make build runner=$(runner); \
	fi

# Same as above but running `make watch runner=$(runner)`
docker-watch: .dockerbuild
	@EXISTS=$$(docker ps -a | grep "$(BASE_CONTAINER_NAME)-watch" | awk '{ print $$1 }'); \
	if [ $$EXISTS ]; then \
		echo "Reusing existing container..."; \
		docker start -ai $$EXISTS; \
	else \
		echo "Running a new container..."; \
		docker run \
			-ti \
			--name $(BASE_CONTAINER_NAME)-watch \
			-v $(CURDIR):/src \
			$(IMAGE_NAME) \
			make watch runner=$(runner); \
	fi

# Same as above but running `make test runner=$(runner)`
docker-test: .dockerbuild
	@EXISTS=$$(docker ps -a | grep "$(BASE_CONTAINER_NAME)-test" | awk '{ print $$1 }'); \
	if [ $$EXISTS ]; then \
		echo "Reusing existing container..."; \
		docker start -ai $$EXISTS; \
	else \
		echo "Running a new container..."; \
		docker run \
			-ti \
			--name $(BASE_CONTAINER_NAME)-test \
			-v $(CURDIR):/src \
			$(IMAGE_NAME) \
			make test runner=$(runner); \
	fi

docker-shell: .dockerbuild
	docker run -ti --rm -v $(CURDIR):/src $(IMAGE_NAME) bash

# makefile ettiquette; mark rules without on-disk targets as PHONY
.PHONY: default help setup fe-setup build watch test docker-build docker-watch docker-test
