help:
	@echo "fe-setup - Installs node dependencies and triggers compilation of build files."

fe-setup:
	npm install;
	gulp build;
