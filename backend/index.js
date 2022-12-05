const express = require("express");
const authRoute = require("./routes/auth");
const countryRoute = require("./routes/base_tables/country");
const stateRoute = require("./routes/base_tables/state");
const districtRoute = require("./routes/base_tables/district");
const universityRoute = require("./routes/base_tables/university");
const streamRoute = require("./routes/base_tables/stream");
const schemeRoute = require("./routes/base_tables/scheme");
const projectRoute = require("./routes/base_tables/project");
const transactionRoute = require("./routes/base_tables/transaction");
const reportRoute = require("./routes/base_tables/report");
const roleRoute = require("./routes/role");
const fundingAgencyRoute = require("./routes/fundingAgency");
const faAdminRoute = require("./routes/fa/admin");
const heiRoute = require("./routes/hei");
const heiAdminRoute = require("./routes/hei/admin");
const verifyOTP = require("./routes/verifyOTP");
const uploadFile = require("./routes/uploadFile");
const bodyParser = require("body-parser");
const recognition = require("./routes/recognition");
const college = require("./routes/college");

require("dotenv").config();

const dbConnection = require("./utils/DBconnection");


const app = express();

app.use(express.json());
app.use(require("cors")());


const routePrefix = "api";
app.use(bodyParser.urlencoded({extended:true}));
app.use(`/${routePrefix}`, authRoute);
app.use(`/${routePrefix}/countries`, countryRoute);
app.use(`/${routePrefix}/states`, stateRoute);
app.use(`/${routePrefix}/districts`, districtRoute);
app.use(`/${routePrefix}/universities`, universityRoute);
app.use(`/${routePrefix}/streams`, streamRoute);
app.use(`/${routePrefix}/schemes`, schemeRoute);
app.use(`/${routePrefix}/projects`, projectRoute);
app.use(`/${routePrefix}/transactions`, transactionRoute);
app.use(`/${routePrefix}/reports`, reportRoute);
app.use(`/${routePrefix}/roles`, roleRoute);
app.use(`/${routePrefix}/admin/funding-agency`, fundingAgencyRoute);
app.use(`/${routePrefix}/admin/hei`, heiRoute);
app.use(`/${routePrefix}/hei/admin`, heiAdminRoute);
app.use(`/${routePrefix}/fa/admin`, faAdminRoute);
app.use(`/${routePrefix}/`, verifyOTP);
app.use(`/${routePrefix}/`, uploadFile);
app.use(`/${routePrefix}/`, recognition);
app.use(`/${routePrefix}/college`, college);
app.use(express.static("public"));

app.get("/", async(req, res) => {
  res.sendFile(__dirname+"/frontend/form.html");
})

app.listen(4000, async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    console.log("dbConnected at", process.env.MONGO_URI);
  } catch (error) {
    console.log("Db not connected");
  }
});
