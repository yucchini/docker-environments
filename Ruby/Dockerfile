FROM ruby:2.6.3

ENV APP_ROOT /usr/src/app

WORKDIR $APP_ROOT

# MYSQL
ENV BUILD_PACKGES nodejs default-libmysqlclient-dev default-mysql-client

# Postgres
# RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs vim-nox nano locales locales-all

RUN apt-get update -qq && apt-get install -y $BUILD_PACKGES && rm -rf /var/lib/apt/lists/*

COPY Gemfile $APP_ROOT

COPY Gemfile.lock $APP_ROOT

RUN bundle install

RUN ln -snf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && echo Asia/Tokyo > /etc/timezone

ENV LANG ja_JP.UTF-8
