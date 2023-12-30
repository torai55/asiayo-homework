# asiayo 的作業

環境需求：

- npm v10.2.1
- node v20.9.0

## development

1. `$ npm install`：安裝所有依賴套件，若已安裝則可省略
2. `$ npm run dev`：使用 nodemon 進行 cold reloading

## test

1. `$ npm install`：安裝所有依賴套件，若已安裝則可省略
2. `$ npm run test`

## run

1. `$ npm install`：安裝所有依賴套件，若已安裝則可省略
2. `$ npm run start`：啟動 server
3. 瀏覽器開啟 URL `http://localhost:3000/convert?source=USD&target=JPY&amount=$1,525` 即可看到範例解答

## changes

- 輸出範例中，雖然貨幣是 JPT 但使用的符號為 `$`，我改成使用 `¥`。若不需要則把 `./src/currency.controller.ts:29` 的 `currency: target` 改成 `currency: 'USD'` 即可
