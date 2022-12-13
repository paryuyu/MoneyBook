

//console.log(process.env.PATH) //환경변수에 관련된 것들이 나온다.

import dotenv from "/dotenv";

dotenv.config();

//현재 작업이 돌아가는 path를 알려주는 코드
console.log(process.cwd())

console.log(process.env.SECRET_KEY);
console.log(process.env.MONGODB_URI);