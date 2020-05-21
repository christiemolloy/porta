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
    LD_LIBRARY_PATH=/opt/oracle/instantclient/ \
    ORACLE_HOME=/opt/oracle/instantclient/ \
    DB=$DB \
    SAFETY_ASSURED=1 \
    UNICORN_WORKERS=2

WORKDIR /opt/system/

ADD . ./
ADD config/examples/*.yml config/
# Needed for Sphinx ODBC
ADD config/oracle/odbc*.ini /etc/

# Oracle special, this needs Oracle to be present in vendor/oracle
ADD vendor/oracle/* /opt/oracle/
RUN if [ "${DB}" = "oracle" ]; \
    then \
        declare oracle_otn=https://download.oracle.com/otn_software/linux/instantclient/19600; \
        declare oracle_version=linux.x64-19.6.0.0.0dbru; \
        declare -a packages=(instantclient-basiclite instantclient-sdk instantclient-odbc); \
        for package in "${packages[@]}"; do \
             zip=${package}-${oracle_version}.zip; \
             wget "${oracle_otn}/${zip}" -O "vendor/oracle/${zip}" \
             && unzip "vendor/oracle/${zip}" -d /opt/oracle \
             && rm -rf "vendor/oracle/${zip}"
        done; \
        ln -sf /opt/oracle/instantclient_19_6 /opt/oracle/instantclient
    fi;

USER root

# Needed to disable webpack compiling
RUN sed -i 's/compile: true/compile: false/' config/webpacker.yml

RUN bash -c "bundle install && bundle exec rake tmp:create"
RUN bash -c "npm install -g yarn && yarn install:safe && rake assets:precompile"
