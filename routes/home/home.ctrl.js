"use strict"
const bcrypt = require('bcrypt');

const { response } = require("../../app");
const jwt = require("jsonwebtoken");

const output = {

  home: (req, res) => {      
    
    let token = jwt.sign({
      id: "springstar"              // Private Claim 자리
    },
    "secretKey",                // 비밀키가 들어갈 자리(Signature)
    {
      subject: "choonsung jwtToken",   // 여기 3개 Public Claim 자리
      expiresIn: '60m',
      issuer: "choonsung"
    });
    console.log("토큰생성\n", token);
     
    try {
      var check = jwt.verify(token, "secretKey");
      if(check) {
        console.log("ID확인", check.id);
      }
    } catch (e) {
      console.log(e);
    }  
    res.render('home/index');


  },
  
  login: (req, res) => {
    res.render('home/login')
  },
}


const users = {
  id: ["springstar", "k8805", "coonjin"],
  psword: ["coonjin2", "coonjin3", "coonjin4"]
};

const process = {
  
  login: (req, res) => {    

    let data = req.body.data
    const id = data.id
    const psword = data.psword;   
    
    // bcrypt  연습
    let email = 'springstar@samsung.com'
    bcrypt.hash(psword, 10, (err, hash) => {
      let user_data = [id, hash, email];
      console.log('bcrypt hash 데이터:',user_data);
    })



    const response = {};
    if(users.id.includes(id)) {
      const idx = users.id.indexOf(id);
      if(users.psword[idx] === psword) {
        response.success = true;
        return res.json(response);           
      }
    }
    response.success = false;
    response.msg = "로그인에 실패하셨습니다.";
    return res.json(response);
  },  
};

module.exports = {
 output, 
 process
};
