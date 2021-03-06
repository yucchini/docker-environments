FROM ruby:2.6.4-alpine

ENV ROOT="/myapp"
ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

WORKDIR ${ROOT}

COPY Gemfile ${ROOT}
COPY Gemfile.lock ${ROOT}

RUN apk upgrade --no-cache && \
    apk add --update --no-cache \
      postgresql-client \
      zsh \
      sudo \
      less \
      tzdata && \
    apk add --update --no-cache --virtual=build-dependencies \
      build-base \
      curl-dev \
      linux-headers \
      libxml2-dev \
      libxslt-dev \
      postgresql-dev \
      ruby-dev \
      yaml-dev \
      # nodejs \
      zlib-dev && \
    gem install bundler && \
    bundle install -j4 && \
    apk del build-dependencies

COPY . ${ROOT}

EXPOSE 3000

# Start the main process.
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
