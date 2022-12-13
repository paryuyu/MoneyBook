// api/login(post)
// resp.json({result: true}) -> 다른 컴포넌트 띄우기
// false는 다시 로그인 띄우기

// fetch로 붙이기???

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

//dotenv 사용설정
import dotenv from "dotenv";
dotenv.config();
const uri= "mongodb+srv://mernyuyu:wkdrnahr777@cluster0.qeg74yn.mongodb.net/test"
//const uri = process.env.MONGODB_URI
mongoose.connect(uri,{dbName:"money"});

import cors from "cors";


const app = express();
import account from "./route/account.js"
import history from "./route/history.js"

//서버 테스트용-morgan 
app.use(morgan("[server] :method :url : status (:response-time ms)"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



//*경로 구분해주기
app.use("/api/account", account)

//API -> /api/account-> register(post) -> req : {email, password, name, gender, birth} resp : {result:true / false , message : 실패했을 때 실패원인}    
//  auth(post) -> {req: email, password} ,resp: {result: true, false}
                            //test => postman으로


app.use("/api/history", history)

app.listen(8080, () => {
    console.log("serverStart")
})

