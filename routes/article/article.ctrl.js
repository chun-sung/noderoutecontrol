"use strict"

let list = [
  {title: 'JavaScript', contents: 'JavaScript is ...', name: 'egoing'},
  {title: 'TypeScript', contents: 'TypeScript is ...', name: '김춘성'}
]

const output = {

  list: (req, res) => {
    // let name = req.query.name  
    res.render('article/list.ejs', { list })
  },
  edit:  (req, res) => {
    res.render('article/edit.ejs')
  },
  regist: (req, res) => {
    res.render('article/regist.ejs')
  }
}

const process = {
  regist: (req, res) => {
    let title = req.body.title;
    let contents = req.body.contents;
    let name = req.body.name;  

    list.push({title: title, contents: contents, name:name});    
    res.redirect('/articles/list');
  },
}

module.exports = {
  output, 
  process
};