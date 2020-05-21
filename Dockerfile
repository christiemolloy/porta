FROM quay.io/3scale/system-builder:ruby25

ARG SPHINX_VERSION=2.2.11
ARG BUNDLER_VERSION=1.17.3
ARG DB=mysql
ARG MASTER_PASSWORD=p
ARG USER_PASSWORD=p

ENV DISABLE_SPRING="true" \
    ORACLE_SYSTEM_PASSWORD="threescalepass" \
    NLS_LANG="AMERICAN_AMERICA.UTF8" \
    TZ="UTC" \
    MASTER_PASSWORD="${MASTER_PASSWORD}" \
    USER_PASSWORD="${USER_PASSWORD}" \
    LC_ALL="en_US.UTF-8" \
    PATH="./node_modules/.bin:/opt/rh/rh-nodejs10/root/usr/bin:$PATH" \
    SKIP_ASSETS="1" \
    DNSMASQ="#" \
    BUNDLE_FROZEN=1 \
    BUNDLE_JOBS=5 \
    TZ=:/etc/localtime \
    DB=$DB \
    SAFETY_ASSURED=1 \
    UNICORN_WORKERS=2

WORKDIR /opt/system/

ADD . ./
ADD config/examples/*.yml config/
# Needed for Sphinx ODBC
ADD config/oracle/odbc*.ini /etc/

USER root
RUN if [ "${DB}" = "oracle" ]; then ./script/oracle/install-instantclient-packages.sh; fi

# Needed to disable webpack compiling
RUN sed -i 's/compile: true/compile: false/' config/webpacker.yml

RUN bash -c "bundle install && bundle exec rake tmp:create"
RUN bash -c "npm install -g yarn && yarn install:safe && rake assets:precompile"
