FROM couchdb:3

ENV HOME /home/dbusr

RUN apt-get install curl
RUN useradd --create-home dbusr
RUN mkdir -p $HOME
WORKDIR $HOME