//jshint esversion:6

const express =require("express");
const bodyParser =require("body-parser");
const request =require("request");
const https =require("https");


const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email =req.body.email;

   console.log(firstname);
    console.log(lastname);
     console.log(email);

  var data ={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };

  var jasondata =JSON.stringify(data);

  const url="https://us1.api.mailchimp.com/3.0/lists/89a731e40e";

  const options = {
    method :"POST",
    auth : "mayur1:246305c802669e3667a540a13a59a17b-us1"
  };
const request =https.request(url,options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname +"/success.html");
  }else{
    res.sendFile(__dirname +"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
});

   });
request.write(jasondata);
request.end();


});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT, function(){
  console.log("server is running on port 3000");
});

//APIKey
//246305c802669e3667a540a13a59a17b-us1

//List // ID
//89a731e40e
