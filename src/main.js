const app = require('./app/index')
const { APP_PORT } = require("./config/default");

app.listen(APP_PORT,'192.168.101.96', (e) => {
  console.log("项目启动成功---->>>",`http://192.168.101.96:${APP_PORT}`);
});
