import jwt from "jsonwebtoken";

let secret = "&1J0LE0NkfuIN1F*ZQFiGrWtI5*75Em5"
//어우~~~졸려


//expiresIn :5 => 5초안에 만료
let jwtCreate = jwt.sign({ id: "blahblah", password: "ssssecret" }, secret, { expiresIn: 5 });
//console.log(jwtCreate)

//만료된거 확인
setTimeout(() => { //이러면 여기서 expiresIn 오류가 뜬다.
    const r = jwt.verify(jwtCreate, secret)
    console.log(r)
}, 6000)

//시크릿 키값은 env에 넣어주자.