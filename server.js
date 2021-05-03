const express = require("express");
const path = require("path");
const alert = require("alert-node");
var sql = require("mssql");
// var sql_jsullc = require("mssql");
//var formidable = require("formidable");
const { json, urlencoded } = require("body-parser");

//var form = new formidable.IncomingForm();
var fs = require("fs");
var moment = require("moment");
var cors = require("cors");
const multer = require("multer");
var JSAlert = require("js-alert");

var corsOptions;
var config = {
  user: "jsudjac",
  password: "$#jsuapple",
  server: "10.1.4.125",
<<<<<<< HEAD
  database: "QCDB"
=======
  database: "QCDB",
  // database: "SLDP_Calibration_test",
>>>>>>> dfe11ed7c00b22f8eb645336665ddfe0885a738a
};

const dbconn = sql.connect(config, (err) => {
  if (!err) {
    console.log("Connected to the database");
  } else {
    console.log("Problem in connecting to database");
    console.log(err);
    console.log("testing");
  }
});

// Set storage engine
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function(req, file, cb) {
    // null as first argument means no error
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//express

const app = express();
const router = express.Router();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
const upload = multer({
  storage: storage,
  dest: "./uploads/", // this saves your file into a directory called "uploads"
}).single("file");
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/validateUser/:userName/:password", (req, res) => {
  console.log("entry");
  console.log(req.params);
  var string1 =
    "select count(username) as userPresent from user_login where username ='" +
    req.params.userName +
    "'  and password = '" +
    req.params.password +
    "'";
  console.log();
  dbconn.query(string1, (err, rows) => {
    if (!err) {
      console.log(rows);
      res.send(rows.recordset[0]);
      console.log("Done");
    } else {
      console.log(err);
    }
  });
});

<<<<<<< HEAD
app.get("/getInActiveDetails", (req, res) => {
=======
// app.get("/*", function(request, response) {
//   response.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.get("/production", (req, res) => {
>>>>>>> dfe11ed7c00b22f8eb645336665ddfe0885a738a
  console.log("get summary details loaded");

  dbconn.query("exec inActiveGrid", (err, rows, fields) => {
    if (!err) {
      res.send(rows.recordsets[0]);
    }
  });
});

app.get("/getInActiveDetails", (req, res) => {
  console.log("get summary details loaded");

  dbconn.query("exec inActiveGrid", (err, rows, fields) => {
    if (!err) {
      res.send(rows.recordsets[0]);
    }
  });
});

app.get("/gaugeDueList", (req, res) => {
  dbconn.query("exec sp_GetDueList", (err, rows, fields) => {
    if (!err) {
      console.log("hello");
      res.send(rows.recordsets[0]);
    }
  });
});

app.get("/getInstrumentID/:instrument", (req, res) => {
  const request = new sql.Request(dbconn);
  request.input("instrument", sql.VarChar, req.params.instrument);
  request.execute("getInstrumentID", (err, rows) => {
    if (!err) {
      let select = {
        ID_No: "Select",
      };
      let arr = [];
      arr.push(select);
      rows.recordsets[0].map((item) => {
        arr.push(item);
      });

      res.send(arr);
    }
  });
});

app.get("/getInstrumentName", (req, res) => {
  const request = new sql.Request(dbconn);

  request.execute("getInstrumentName", (err, rows) => {
    if (!err) {
      res.send(rows.recordsets[0]);
    }
  });
});

app.get("/gaugeHistory/:id", (req, res) => {
  const request = new sql.Request(dbconn);
  console.log("gauge history hitttt");
  request.input("ID_No", sql.VarChar, req.params.id);
  request.execute("GaugeHistoryDetails", (err, rows) => {
    if (!err) {
      res.send(rows.recordsets[0]);
    } else {
      res.send(err);
      // res.send({ id: null, error: "No data found" });
    }
  });
});
///activateInstrumentById

app.get("/getFile/:fileName", function(req, res) {
  console.log("start", req.params.fileName);
  var query =
    "select fileName,FileData from CalibrationData where fileName = '" +
    req.params.fileName +
    "'";
  dbconn.query(query, (err, rows) => {
    if (!err) {
      res.send(rows.recordset[0]);
      console.log("Done");
    }
  });
});

app.post("/instrumentRemoval/:id_no", function(req, res) {
  let deleted = false;
  console.log(req.params);

  let idStr = decodeURIComponent(req.params.id_no);
  var ids = idStr.split("QwErTy");
  //let idss = ids.splice(ids.length - 1);
  for (let index = 0; index <= ids.length - 1; index++) {
    const request = new sql.Request(dbconn);
    request.input("idno", sql.VarChar, ids[index]);
    request.execute("instrument_removal2", (err, result) => {
      if (!err) {
        deleted = true;
      } else {
        console.log(err);
      }
    });
  }
  res.send({ isdeleted: deleted });
});

app.post("/updateTables/:table/:field/:instrument/:id_no/:newvalue", function(
  req,
  res
) {
  console.log(req.params);
  const request = new sql.Request(dbconn);
  request.input("tableName", sql.VarChar, req.params.table);
  request.input("fieldName", sql.VarChar, req.params.field);
  request.input("instrument", sql.VarChar, req.params.instrument);
  request.input("ID_No", sql.VarChar, req.params.id_no);
  request.input("newvalue", sql.VarChar, req.params.newvalue);
  request.execute("updateTables", (err, result) => {
    if (!err) {
      res.send(result);
    }
  });
});

app.post("/updateCalibrationFile", upload, function(req, res) {
  const request = new sql.Request(dbconn);
  console.log(req.body);
  request.input("instrument", sql.VarChar, req.body.instrument);
  request.input("id_no", sql.VarChar, req.body.id_no);

  let encode_file = null;
  let fileName = "";
  if (req.file) {
    fileName = req.file.originalname;
    var filepath = path.join(__dirname, req.file.path);
    console.log(filepath);
    var stream = fs.readFileSync(filepath);
    encode_file = stream.toString("base64");
  }
  if (encode_file) {
    request.input(
      "filedata",
      sql.VarBinary,
      new Buffer.from(encode_file, "base64")
    );
  }
  request.input("filename", sql.VarChar, fileName);
  // request.input("filedata", sql.VarBinary, encode_file);
  request.execute("updateCalibrationFile", (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});


app.get("/production", (req, res) => {
  console.log("get summary details loaded...");

  dbconn.query("exec QCGrid", (err, rows, fields) => {
    if (!err) {
      res.send(rows.recordsets[0]);
    }
  });
});















app.get("/getInstrumentFile/:id", function(req, res) {
  console.log("start", req.params.id);
  var query =
    "select fileName,FileData from Instrument_Details where ID_No = '" +
    req.params.id +
    "'";
  dbconn.query(query, (err, rows) => {
    if (!err) {
      res.send(rows.recordset[0]);
      console.log("Done");
    }
  });
});

app.delete(
  "/gaugedeletion/:ID_No",
  urlencoded,

  (req, res) => {
    const request = new sql.Request(dbconn);
    request.input("ID_No", sql.VarChar, req.params.ID_No);
    request.execute("QCDelete", (err, result) => {
      if (!err) {
        res.send(result);
      }
    });
  }
);

<<<<<<< HEAD


=======
>>>>>>> dfe11ed7c00b22f8eb645336665ddfe0885a738a
app.post("/activateInstrumentById/:idNo", (req, res) => {
  const request = new sql.Request(dbconn);
  let query =
    "update Instrument_Details set Active = 1 where ID_No ='" +
    req.params.idNo +
    "'";
  request.query(query, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
});

<<<<<<< HEAD

=======
>>>>>>> dfe11ed7c00b22f8eb645336665ddfe0885a738a
app.post("/addCalibrationData", upload, (req, res) => {
  let instrument = "";
  let IdNo = "";
  let calBy = "";
  let calDate = "";
  let time = "";
  let location = "";
  let description = "";
  let fileName = "";
  let encode_file = null;
  console.log(req.body);
  if (req.file) {
    fileName = req.file.originalname;
    var filepath = path.join(__dirname, req.file.path);
    console.log(filepath);
    var stream = fs.readFileSync(filepath);
    encode_file = stream.toString("base64");
  }
  if (req.body) {
    instrument = req.body.instrument;
    IdNo = req.body.IdNo;
    calDate = req.body.caldate;
    time = req.body.time;
    location = req.body.location;
    calBy = req.body.calBy;
    description = req.body.description;
  }
  uploadCalibrationdata(
    instrument,
    IdNo,
    calBy,
    calDate,
    time,
    location,
    description,
    fileName,
    encode_file,
    req,
    res
  );
  //console.log("calibration api got kicked in");
  //res.redirect("/");
});

function uploadCalibrationdata(
  inst,
  idNo,
  calBy,
  calDate,
  noOfDays,
  location,
  description,
  fname,
  encode_file,
  req,
  res
) {
  let tempDate = moment(calDate).add(noOfDays, "days");
  const dueDate =
    moment(tempDate).format("YYYY") +
    "-" +
    moment(tempDate).format("MM") +
    "-" +
    moment(tempDate).format("DD");

  const request = new sql.Request(dbconn);
  request.input("instruname", sql.VarChar, inst);
  request.input("id", sql.VarChar, idNo);
  request.input("calby", sql.VarChar, calBy);
  request.input("caldate", sql.Date, calDate);
  request.input("time", sql.Int, noOfDays);
  request.input("duedate", sql.Date, dueDate);
  request.input("fname", sql.VarChar, fname);
  if (encode_file) {
    request.input(
      "fdata",
      sql.VarBinary,
      new Buffer.from(encode_file, "base64")
    );
  } else {
    request.input("fdata", sql.VarBinary, encode_file);
  }
  request.input("loc", sql.VarChar, location);
  request.input("remarks", sql.VarChar, description);
  request.execute("QCInsert", (err, result) => {
    if (!err) {
      console.log(result);
      res.send(result);
    } else {
      console.log(err);
    }
  });
}

app.post("/addInstrumentDetails", upload, function(req, res) {
  let encode_file = null;
  let fileName = "";
  let instrument = "";
  let IdNo = "";
  let serialNo = "";
  let modelNo = "";
  let description = "";
  console.log(req.body);
  console.log(req.file);
  if (req.file) {
    fileName = req.file.originalname;
    var filepath = path.join(__dirname, req.file.path);
    console.log(filepath);
    var stream = fs.readFileSync(filepath);
    encode_file = stream.toString("base64");
  }
  if (req.body) {
    instrument = req.body.instrument;
    IdNo = req.body.IdNo;
    modelNo = req.body.modelNo;
    serialNo = req.body.serialNo;
    description = req.body.description;
  }
  uploadFile(
    instrument,
    IdNo,
    modelNo,
    serialNo,
    description,
    fileName,
    encode_file,
    res
  );
});

function uploadFile(instu, ino, sno, pno, diption, fname, fdata, res) {
  console.log(
    instu +
      "" +
      ino +
      "-----" +
      "-----" +
      sno +
      "-----" +
      pno +
      "-----" +
      diption
  );
  const request = new sql.Request(dbconn);
  request.input("instruname", sql.VarChar, instu);
  request.input("id", sql.VarChar, ino);
  request.input("serialNo", sql.VarChar, sno);
  request.input("partNo", sql.VarChar, pno);
  request.input("description", sql.VarChar, diption);
  request.input("fileName", sql.VarChar, fname);
  if (fdata != null) {
    request.input("fileData", sql.VarBinary, new Buffer.from(fdata, "base64"));
  } else {
    request.input("fileData", sql.VarBinary, fdata);
  }
  request.execute("instrument_details_upload1", (err, result) => {
    if (!err) {
      console.log(result);
    } else {
      console.log(err);
    }
    res.send(result);
  });
}

app.use(express.static(path.join(__dirname, "build")));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(9000, () => {
  console.log("node running on port 9000");
});
