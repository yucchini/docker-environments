# 環境構築

1. Dockerfileの作成

2. Gemfileの作成

```Gemfile
source 'https://rubygems.org'
gem 'rails', '~>5’ （バージョン指定）
```

3. 空のGemfile.lockを作成

4. docker-compose.yml作成

5. プロジェクト構築

```
$ docker-compose run web rails new . --force --no-deps --database=postgresql
```

6. 新しいGemfileが取得されたのでもう一度イメージを作成するためにビルド

```
$ docker-compose build
```

7. データベースに接続

```
default: &default
  adapter: postgresql
  encoding: unicode
  host: db
  username: postgres
  password: password
  pool: 5


development:
  <<: *default
  database: myapp_development


test:
  <<: *default
  database: myapp_test
```

8. アプリ起動

```
$ docker-compose up
```

9. データベース作成

```
$ docker-compose run コンテナ名 bin/rails db:migrate
```

## その他

### アプリケーションの再構築
- いくつかの変更

```
$ docker-compose up -build
```

- 完全な再構築

```
$ docker-compose run コンテナ名 bundle install
```
