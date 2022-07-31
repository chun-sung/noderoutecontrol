//---- mariaDBConn-------------
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '192.168.0.171' , port: 3306 ,
    user: 'root', password:'root',
    connectionLimit: 5
});

async function GetTopic() {
    let conn, rows;
    try {
      conn = await pool.getConnection();
      conn.query('USE o2');                               // 사용할 DB선택
      rows = await conn.query("SELECT * FROM topic");     // 쿼리 설정 (배열안에 객체 형식으로 저장)
      // console.log(rows)
    } catch (err) {
            throw err;
    } finally {
        if (conn) conn.end();   
        return rows[0].title;                                   // 배열중 첫번째 객체 데이터 리턴
    }
}

module.exports = { 
    getTopic: GetTopic  
}