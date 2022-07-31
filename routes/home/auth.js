// const jwt = require('jwt');
// const MSG = require('../modules/responseMessage');
// const CODE = require('../modules/statusCode');
// const util = require('util');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    checkToken: async (req, res, next) => {
      var token = req.headers.token;
      // 토큰 없음
      if (!token) {        
        let MSG  = { EMPTY_TOKEN : 'EMPTY_TOKEN' }
          return res.json(MSG.EMPTY_TOKEN);
      }
      // decode
      const user = await jwt.verify(token);
      console.log('jwt토큰 확인',user)
      // 유효기간 만료
      if (user === TOKEN_EXPIRED){
        let MSG  = { EXPIRED_TOKEN : 'EXPIRED_TOKEN' }
          return res.json(MSG.EXPIRED_TOKEN);
      }
      // 유효하지 않는 토큰
      if (user === TOKEN_INVALID) {
        let MSG  = { INVALID_TOKEN : 'INVALID_TOKEN' }
          return res.json(MSG.INVALID_TOKEN);
      }
      if (user.idx === undefined) {
        let MSG  = { INVALID_TOKEN : 'INVALID_TOKEN' }
          return res.json(MSG.INVALID_TOKEN);
        }
      req.idx = user.idx;
      next();
    }
}

module.exports = authUtil;