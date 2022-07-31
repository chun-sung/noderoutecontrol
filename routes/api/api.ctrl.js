"use strict"

let users = [
  {
    id: "020003211",
    name: 'choonsung',
    email: 'springstar@daum.net'
  },
  {
    id: "020003213",
    name: 'egoing',
    email: 'k8805@gmila.com'
  },
]
  
// users = JSON.stringify(users);
const output = {
  list: (req, res) => {    
    console.log("데이터 list")    
    res.render('api/api', {users});   // ejs view 템플릿은 객체를 전달하면 객체를 전달해 준다
  },                                  // 내부적으로 변환 (JSON -> Object)
 
  user: (req, res) => {
    console.log("데이터 user")        
    res.send(users);           // 객체데이터는 JSON으로 변환하여 전달 (send는 텍스트, JSON 등 막 전달 가능)   
  },

  // 외부 OPEN API 데이터 전송용
  data: (req, res) => {    
    // users = JSON.stringify(users);     // ❤️콜백 내부에서 여러번 반복 실행 되는 문제 발생되는 거 같음
    // res.render('api/data', {users})    // 데이터를 보내고 다시 화면에 뿌리는 과정에서 중첩되어 계속 실행되어
                                          // Json 객체가 이상하게 변형됨
    res.json(users)                 
  }
}

const process = {
  // 외부 OPEN API 데이터 수신용
  user: (req, res) => {
    users.push(req.body);
    res.send(users);    
  },
}

module.exports ={
  output,
  process
}