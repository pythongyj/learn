const app = require('./app/index')
const { APP_PORT } = require("./config/default");

app.listen(APP_PORT, () => {
  console.log("项目启动成功");
});
