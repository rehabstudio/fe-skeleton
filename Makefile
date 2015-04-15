APP_NAME = fe-skeleton
# can be overridden at runtime eg. `make build runner=grunt`
runner = gulp

help:
	@echo "fe-skeleton"
	@echo ""
	@echo "The following commands are available:"
	@echo ""
	@echo "\tmake setup - Installs node dependencies and requisites for build"
	@echo "\tmake watch - Triggers a watcher via preferred task runner"
	@echo "\tmake <TASK> - Triggers specified task, e.g. 'make build'"
	@echo ""
	@echo ""
	@echo "Docker based building is also available:"
	@echo ""
	@echo "\tmake docker cmd=<TASK> - Triggers specified task via docker, e.g. 'make docker cmd=build'" 
	@echo ""

default: help

watch: node_modules
	$(runner);

# this allows any of the gulp commands to be called, e.g. `make scripts`
build test images lint scripts styles templates: node_modules
	$(runner) $@;

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
IMAGE_NAME = rehabstudio/frontend-build
BASE_CONTAINER_NAME = $(APP_NAME)-$(runner)

# default docker command
cmd=build

# Here we check if a container with the correct name already exists and if
# it does we run it again. Otherwise we run a new one and have it call
# `make $(cmd) runner=$(runner)`
docker:
	@EXISTS=$$(docker ps -a | grep "$(BASE_CONTAINER_NAME)-$(cmd)" | awk '{ print $$1 }'); \
	if [ $$EXISTS ]; then \
		echo "Reusing existing container..."; \
		docker start -ai $$EXISTS; \
	else \
		echo "Running a new container..."; \
		docker run \
			-ti \
			--name $(BASE_CONTAINER_NAME)-$(cmd) \
			-v $(CURDIR):/src \
			$(IMAGE_NAME) \
			make $(cmd) runner=$(runner); \
	fi

docker-shell: .dockerbuild
	docker run -ti --rm -v $(CURDIR):/src $(IMAGE_NAME) bash

# makefile ettiquette; mark rules without on-disk targets as PHONY
.PHONY: default help setup fe-setup docker
.PHONY: build watch test lint images scripts styles templates
