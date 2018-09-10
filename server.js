const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

let connection = mysql.createConnection({
  hostname: 'localhost',
  user: 'root',
  password: 'k199923',
  database: 'users',
});

connection.connect((err)=>{
  if(err) throw err;
  console.log('Connected to Database');
})


let registrator = async (login,password)=>{
  await connection.query(`INSERT INTO users_info (login, password) VALUES ('${login}', '${password}')`,(err,result)=>{
    if(err) throw err;
    console.log('New record insterted');
  })
}

let uniqueRecordTest = async (login,password)=>{
  await connection.query(`SELECT EXISTS(SELECT 1 FROM users_info WHERE login = '${login}')`,(err,result)=>{
    if(err) throw err;
    resultNumber = result[0][Object.keys(result[0])[0]];
    if(resultNumber !== 0){
      console.log('Duplicate found');
    }else{
      registrator(login,password);
    }
  })
}


let app = express();
app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false,
}))



app.get('/',(req,res)=>{
  res.sendFile('index.html');
})
app.post('/register',(req,res)=>{
  console.log('Register request recieved');
  console.log(req.body);
  uniqueRecordTest(req.body.login,req.body.password);
  res.send('OK');
})




app.listen(3000,()=>{
  console.log('Server is listening on port 3000');
})
