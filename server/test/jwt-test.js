import jwt from "jsonwebtoken";

let secret = "&1J0LE0NkfuIN1F*ZQFiGrWtI5*75Em5"
let Wsecret = "&1J0LE0NkfuIN1F*ZQFiGrWtI5*75Em6"

//생성임 ! sign({페이로드값},secret키값->32글자로 적어야하는데 lastpass.com -> how it work -> passwordgenerater)
let token = jwt.sign({title:"jwt", subject:"backEnd"}, secret);

console.log(token); //이렇게해서 나오는 토큰키?를 jwt.io 이 홈페이지?로 가서 테스트해보면 위에 입력한 값이 바디값(페이로드)으로 받아진다.


//날라온 토큰값의 바디값을 다시 받아와주는거.
let rst = jwt.verify(token, secret); //키가 다르면 토큰 에러가 터짐.
console.log(rst)
const v_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6Imp3dCIsInN1YmplY3QiOiJmcm9udEVuZCIsImlhdCI6MTY2MTQwMzg2OH0.t70b8_-lJjWdTdkk5x5JtYiUA_YUQnoo9Vzc7NOxmtQ"
// jwt.io에서 임의대로 설정을 바꾼거임.

console.log(jwt.verify(v_token,secret)) //토큰값이 맘대로 변경되면 에러터짐.