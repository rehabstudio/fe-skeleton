help:
	@echo "fe-skeleton"
	@echo ""
	@echo "The following commands are available:"
	@echo ""
	@echo "\tmake setup - Installs node dependencies and requisites for build"
	@echo "\tmake watch - Triggers gulp to watch and build files"
	@echo "\tmake <TASK> - Triggers specified task, e.g. 'make build'"
	@echo ""

default: help

# this allows any of the gulp commands to be called, e.g. `make scripts`
build test images lint scripts styles templates watch: node_modules
	npm run gulp -- $@;

# just install node_modules, also callable as `make node_modules`
setup: node_modules

# this only runs if the modification date of `package.json` is more recent
# than the modification date of `node_modules`, `touch $@` updates the
# modification date of `node_modules` when done.
node_modules: package.json
	npm cache clean;
	npm install;
	touch $@;

# makefile ettiquette; mark rules without on-disk targets as PHONY
.PHONY: default help setup build watch test lint images scripts styles templates
