import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    email : {type : String , unique : true},
    //unique설정을 하게되면 필드에 데이터를 집어넣을 때 유니크한 값만 받아올 수 있게한다. 중복되면 !에러
    password : String,
    name : String,
    birth : Number,
    gender : String
});

export default mongoose.model("account", accountSchema);