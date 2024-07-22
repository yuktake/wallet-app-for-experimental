# 環境構築

docker-compose.yamlの設置  
api/Dockerfileの設置  
front/Dockerfileの設置  

<details>
<summary>api/Gemfileの設置</summary>

```
source 'https://rubygems.org'
ruby "3.2.2"
gem "rails", "~> 7.0.5", ">= 7.0.5.1"
```

</details>

api/Gemfile.lock(空)の設置  

<details>
<summary>api/entrypoint.shの設置</summary>

```
#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
```
</details>

<details>
<summary>docker-compose build</summary>
  
2.を実行するときにDockerfileでbundle installしているのにrailsコマンドが使えないため  
手動で実行bundle installする必要がある。

```
1. docker-compose run api bundle install
2. docker-compose run api rails new . --force --no-deps --database=mysql --skip-test --webpacker --api
<!-- Gemfileに変更がかかっているので、bundle installするために再度ビルド -->
3. docker-compose build
```

</details>

### database.ymlの変更
4. developとtestの環境を設定しないとDB作成でエラーが起きる

### テーブル作成
5. docker-compose run api rake db:create

### frontのプロジェクト作成
docker-compose run front npm create vite@latest
→以下の質問に答える
* Project name: ›front
* Select a framework: › React
* Select a variant: TypeScript + SWC

frontフォルダ内にfrontフォルダができてしまうが2個目のfrontフォルダは不要なので全てのファイルをDockerfileがある１階層上にあげる

### コンテナ起動
docker compose up -d

### ライブラリインストール
* docker exec -it <container_name> bash
* npm run install

※次回以降はコンテナの起動時にnpm run devでコンテナ内で起動する

### これで画面が表示されないとき
#### vite.config.tx
``` typescript
export default defineConfig({
  
  # 以下追加
  server: {
    host: true
  },

  plugins: [react()],
})
```
を追加

### テーブル作成
rails generate migration CreateWallets name:string
rails generate migration CreateHistories wallet:references name:string amount:decimal transaction_type:string

### React Routerの追加
npm install react-router-dom

### rack-corsの追加
gemfileでコメントアウトされているものを解除する

### muiの追加
npm install @mui/material @emotion/react @emotion/styled

### mui iconの追加
npm install @mui/icons-material