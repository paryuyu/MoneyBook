import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken"
import accountSchema from "../model/account.js"
import historySchema from "../model/history.js"
//사용자의 등록된 정보들을 가져와야함.
//인증받은 애들만 여기로 보내줘야함.
//토큰을 가지고 있는 애들만 들어올 수 있게.
//토큰을 어떻게 보내냐...? -> Authorization: Bearer <token> 요렇게 가져와야함. Bearer는 인증타입임.
//토큰은 미들웨어에서 처리할거임.
//auth token check 미들웨어

router.use((req, res, next) => {

    //헤더에서 Authorization 정보만 뽑아오기.
    //요청이 들어왔을 때 토큰 문자열만 뽑아주고, 그 문자열로 확인.

    const authorization = req.get("Authorization") //이게 토큰 문자열임.

    //문자열 자체가 안 넘어오면 권한X
    if (!authorization || !authorization.startsWith("Bearer")) { //Bearer  -> 인증방식도 체크해주기. 
        return res.status(401).json({ result: false, message: "접근 권한이 없습니다. 로그인을 해주세요." })
    }

    let token = authorization.split(" ")[1]; //공백을 split하기


    try {
        //토큰 유효성 검사 해주기
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        //console.log(payload) //이 페이로드 값이 어디서 넘어오는거니.
        req.logonEmail = payload.email;

    } catch (err) {
        console.log(err)
        return res.status(401).json({ result: false, message: "권한이 없는 인증서입니다." })
    }

    next();
})


router.get("/", async (req, res) => {
    //console.log(req.logonEmail);
    //여기로 들어가면 맨 첫 화면임.
    let founduserEmail = await accountSchema.findOne({ email: req.logonEmail }) //유저아이디값으로 유저정보 받아오기.
    return res.status(200).json({ result: true, message: "접속성공" })
})


router.post("/input", async (req, res) => {

    const input = {
        content: req.body.content,
        pattern: req.body.pattern,
        type: req.body.type,
        money: req.body.money,
        place: req.body.place,
        date: req.body.date,
        category: req.body.category,
        userEmail: req.body.userEmail
    }

    try {
        let createContent = await historySchema.create(input)
        res.json({ result: true, message: "입력성공" })
    } catch (e) {
        res.json({ result: false, message: "내용을 다시 입력해주세요." })
    }

    //이메일값 같이 인설트 해주기???

}
)


router.post("/", async (req, res) => {
    
    try {
        let cashbook = await historySchema.find({ userEmail : req.body.logon }).sort("-date").lean();
        res.status(200).json({ result: cashbook, message: "성공" })
        console.log(cashbook)

    } catch (e) {
        res.json({ result: false, message: "다시 조회해주세요." })
    }
});

//월별조회
router.get("/month", async (req,res)=>{
    const month = req.query.month;
    const parsed = month.split("-");
    const start = new Date(parsed[0],parsed[1]-1,1)
    const end = new Date(parsed[0],parsed[1],1)
    
    try{
        const histories = await historySchema.find({
            userEmail: req.query.logon,
            date: {$gte:start, $lt:end}
        }).sort("-date").lean()

        console.log(histories,"server-month-get방식")
        return res.status(200).json({result:true, datas: histories});
    }catch(err){
        console.log(err)
        res.status(500).send({result:false})
    }
})



//report에서 날짜 기간 조회
// 수입합계/지출합계 -> 따로 보여주기.
// 밑에다가 stackBar해주기. -> horizen bar로 써보기 (카드 합산/현금합산을 수평으로 보여주기)
// 파이형으로도 보여주기(위에 체크박스로 조건주기.) -> sort해서 합산이 큰 애들부터 뿌려주기.
// 컴포넌트 새로 만들고, 서버에 붙여주기(fetch).

router.get("/search", async (req,res)=>{
    const start = new Date(req.query.start) //2022-03-01
    const end = new Date(req.query.end) //2022-04-07
    //end.setDate(end.getDate()+1);
    
    try{
        const histories = await historySchema.find({
            userEmail: req.query.logon,
            date: {$gte:start, $lt:end}
            //카테고리도 걸어주기
        }).sort("-date").lean()

        console.log(histories,"report 찾아주기")

        return res.status(200).json({result:true, datas: histories});
    }catch(err){
        console.log(err)
        res.status(500).send({result:false})
    }
})
 





//삭제
router.post("/delete", async (req, res) => {
    let chkVal = req.body.chkValue
    try {
        let cashbookDel = await historySchema.deleteOne({ _id:chkVal }).lean();
        res.status(200).json({ result: true, message: "삭제성공" })
        console.log(cashbookDel)

    } catch (e) {
        res.json({ result: false, message: "삭제를 다시 시도해주세요." })
    }
});



export default router;