# PRCNHRMS - 公主連結戰隊人事管理系統
一個用於管理公主連結戰隊成員的網頁應用程式

## 功能
* 帳號 - 以 Google 帳號登入
* 戰隊管理
  * 成員管理 - 新增、刪除、及修改成員清單
  * 權限管理 - 管理可檢視戰隊資料的使用者
* 戰隊競賽
  * 出缺勤 - 紀錄戰隊競賽中成員的出勤狀況

## 系統
本系統以MERN架構進行開發
### Client
* React
* Redux
* Material-UI
### API Server
* Express
* Mongoose

## 建置
### 開發環境
1. 安裝 nodejs 環境
2. 執行 `git clone https://github.com/dexlansoprazole/PRCNHRMS.git`
3. 執行 `cd PRCNHRMS` 然後執行 `npm install`
4. 執行 `cd client` 然後執行 `npm install`
5. 建立 /.env
    ```
    PORT = <port for api server>
    MONGODB_URI = <mongodb connect uri>
    REACT_APP_CLIENT_ID = <google api client id>
    COOKIE_SECRET = <secret for express session>
    ```
6. 建立 /client/.env
    ```
    REACT_APP_CLIENT_ID = <google api client id>
    ```
7. 執行 `npm run server` 啟動 api server
8. 執行 `npm run client` 啟動 client server

## Demo
* [prcnhrms.herokuapp.com](https://prcnhrms.herokuapp.com/)