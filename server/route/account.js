//회원가입, 로그인, 인증까지 붙이기
import express, { application, response } from "express";
import accountSchema from "../model/account.js"

//토큰 -> 로그인인증서 
import jwt from "jsonwebtoken"

//비밀번호나 주민등록같은 주요개인정보 암호화하기.
import bcrypt from "bcrypt";

//라우터설정
const router = express.Router();

//바디설정
router.use(express.urlencoded({ extended: false }));


//로그인 검증 -> 리액트에서 폼 fetch로 넘어온 정보들 처리해주기.
router.post("/auth", async (req, res) => {

    let { email, password } = req.body


    //결과값이 없으면 null, 있으면 찾아와줌.(model에서 email에 unique값을 줘서 찾아올 때 이메일로 찾아오기.)
    let findUserAuth = await accountSchema.findOne({ email });

    //email로 찾아온 정보랑 비밀번호(암호화)가 맞는지, 인증서가 있는지 확인해주기.
    //암호화되어있는 비밀번호 비교는 compare함수쓰기.
    if (findUserAuth) {

        //그냥 compare를 해주면 await을 해줘야하고, await을 안해주려면 Sync가 있는 애들을 써주면 됨.
        let pswdChk = bcrypt.compareSync(password, findUserAuth.password)


        //비밀번호가 맞으면 토큰확인하기.
        if (pswdChk) {

            let token = jwt.sign({ email: findUserAuth.email }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 12 })
            //토큰은 12시간 내에만 쓸수있게 설정
            res.status(200).json({ result: true, message: "로그인 성공", token }) //토큰은 응답을 보낼 때 같이 보내주면 됨. 토큰 값은 스트링임. => 클라이언트(프론트)쪽으로 보내면 됨.
            //로그인 성공하면! - 세션X jsonwebtoken을 사용할거임.

        } else if (!pswdChk) {
            res.status(401).json({ result: false, message: "비밀번호를 확인하세요" })
        }

    } else if (!findUserAuth) {
        res.status(401).json({ result: false, message: "이메일을 확인하세요" })
    }

})


//토큰 로그인 안 풀리게 유효성검사
router.post("/valid", async (req, res) => {
   
    try {
        const data = jwt.verify(req.body.token,process.env.SECRET_KEY)
        res.status(200).json({ result: true, owner: data.email })

    } catch (e) {
        res.status(401).json({ result: false, message: e.message })
    }
})




//데이터베이스에 넣는게 끝
//이메일값에서 오류뜨면 잡아줘야함.
router.post("/register", async (req, res) => {

    //오류뜨면 잡아주기.
    let inputPassword = req.body.password //집어넣는 패스워드
    let hashingPassword = await bcrypt.hash(inputPassword, 10)
    console.log(req.body,'body')
    const userInfo = {
        email: req.body.email,
        //unique설정을 하게되면 필드에 데이터를 집어넣을 때 유니크한 값만 받아올 수 있게한다. 중복되면 !에러
        password: hashingPassword,
        name: req.body.name,
        birth: req.body.birth,
        gender: req.body.gender
    }

    try {
        let insertUserInfo = await accountSchema.create(userInfo);
        console.log(insertUserInfo,'insertUserInfo')
        res.json({ result: true, message: userInfo });

    } catch (e) {
        res.json({ result: false, message: "이메일주소를 다시 입력하세요." })
    }


})


export default router;
//===module.exports router