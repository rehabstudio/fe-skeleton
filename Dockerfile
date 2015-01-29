FROM debian
MAINTAINER Ryan Grieve <ryan@rehabstudio.com>

# update, upgrade and install base requisites
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
        apt-transport-https \
        inotify-tools \
        build-essential \
        sudo \
        curl

# install node from ppa
RUN curl -sL https://deb.nodesource.com/setup | bash -
RUN apt-get install -y nodejs

# install phantomjs requirements
RUN apt-get install -y \
        libfreetype6 \
        libfontconfig1

# npm-ception: install latest from npm
RUN npm install -g npm
# install global task runners and phantomjs
RUN npm install -g grunt-cli gulp phantomjs

# install gulp sass requirements
RUN apt-get install -y ruby
RUN gem install sass

VOLUME ['/src']
WORKDIR /src
