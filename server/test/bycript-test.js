//암호화기법
import bcrypt from "bcrypt";


!function () {

    const plain = "1q2w3e4r";

    //hash는 해싱 알고리즘을 이용해서 문자열을 바꿔줌 ->암호화
    //(암호화시키고싶은 문자, 몇번 암호화 해줄건지, function을줘야하는데 에러랑 데이터값이 들어옴)
    //숫자가 너무 크면 작업시간이 너무 길다. -> 
    bcrypt.hash(plain, 10, (err, data) => {
        console.log("err->", err)
        console.log("data->", data)
        //복원이 되는 암호화가 있고 복원이 안되는 암호화가 있음.
    })

}();


//암호화해서 패스워드값만 저장
//env에 넣어둬도 됨
// {...req.body, password:hash} 이런 형태로 저장
// 평문으로 보내주면 -> 암호화 된 비밀번호를 비교해줘야함. 

!async function () {

    const plain = "1q2w3e4r";

    const result = await bcrypt.hash(plain, 10)
   

    //const check = await bcrypt.compare(plain, result);
    //console.log(check)

    
    const check = bcrypt.compareSync(plain, result);
    console.log(check)

}();


