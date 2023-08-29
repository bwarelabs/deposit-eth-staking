FROM ubuntu as base

# Setup env
ENV PATH=./node_modules/.bin:/home/ethsec/.local/bin:$PATH

USER root
WORKDIR /root

# Install OS packages
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get -y upgrade \
    && DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install openssh-client sudo git curl build-essential wget \
    && apt-get clean

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - \
    && sudo apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g npm@latest \
    && npm install --global yarn \
    && node --version \
    && npm --version \
    && yarn --version

ENV HOME=/home/ethsec

WORKDIR /home/ethsec
