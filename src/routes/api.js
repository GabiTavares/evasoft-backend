const express = require("express");
const router = express.Router();
//const apicontroller = require("../controllers/apiController");

var mysql = require('mysql');

const connection = mysql.createConnection({
    
  host     : 'tcc.cbkvevgr7t6y.us-east-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'WRX8Baz1JaUyrd6zmsQd',
  port     : 3306,
  database: "DBTCC",
});

function execSql (strQry) {
  connection.query(strQry, (err, results) => {
    if(err) {
      console.log(err)
    }else {
      console.log('Success')
    }
  })
}

function SqlQuery (sqlQry, res) {
    
  connection.query(sqlQry, (err, results) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    } else {
      console.log('Success');
    }
    res.json(results) 
  });
}

router.get('/listaId', (req,res) => {
  const list = SqlQuery('SELECT DISTINCT ID FROM ForkliftList', res)
})

router.get("/marca", (req, res) => {
  const teste = SqlQuery("SELECT DISTINCT MARCA FROM ForkliftList", res);
});

router.get('/modelo', (req, res) => {
  const teste = SqlQuery('SELECT DISTINCT MODELO FROM ForkliftList', res)
})
router.get('/ano', (req, res) => {
  const teste = SqlQuery('SELECT DISTINCT ANO FROM ForkliftList', res)
})
router.get('/motor', (req, res) => {
  const teste = SqlQuery('SELECT DISTINCT MOTOR FROM ForkliftList', res)
})
router.get('/falha', (req, res) => {
  //const falhas = SqlQuery('SELECT DISTINCT DecisionRoot.RootCause FROM DecisionRoot INNER JOIN RootCause ON DecisionRoot.RootCause = RootCause.ID', res)
  const falhas2 = SqlQuery('SELECT DISTINCT RootCause.ROOTCAUSE, Symptoms.Symptoms from RootCause INNER JOIN DecisionRoot ON DecisionRoot.RootCause = RootCause.ID INNER JOIN Symptoms ON DecisionRoot.Symptons = Symptoms.Id', res)
})

router.get('/catalogo', (req, res) => {
  const catalogo = SqlQuery('SELECT DISTINCT MARCA, CODIGO, COMPONENTE, SISTEMA FROM Catalog', res)
})

router.get('/decision', (req, res) => {
  const testando = SqlQuery('SELECT DecisionRoot.ForkliftId, RootCause.ROOTCAUSE FROM DecisionRoot INNER JOIN RootCause ON RootCause.ID = DecisionRoot.RootCause', res)
})

router.get('/equipamentos', (req, res) => {
  const equip = SqlQuery('SELECT DISTINCT ID, MARCA, MODELO, ANO, MOTOR FROM ForkliftList', res)
})

router.post('/cadastro', (req, res) => {
  const {marca} = req.body;
  const {modelo} = req.body;
  const {ano} = req.body;
  const {motor} = req.body;
  const {serie} = req.body;

  let SQL = `INSERT INTO ForkliftList (MARCA, MODELO, ANO, SERIE, MOTOR) 
  VALUES ('${marca}', '${modelo}', ${ano}, '${serie}', '${motor}')`;

  execSql(SQL)
  
})


module.exports = router;