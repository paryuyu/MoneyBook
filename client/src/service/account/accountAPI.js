
//fetch할 때 옵션 가져다쓰려고 만들어둠.

class AccountAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;

        this.getOption = {
            method: "get"
        }

        this.postOption = {
            method: "post",
            headers: {
                "content-type": "application/json"
            }
        }
    }

    //로그인 인증시 
    async auth(email, password) {
        const response = await fetch(this.baseURL + "/api/account/auth", {
            ...this.postOption,
            body: JSON.stringify({ email, password })
        })

        return await response.json();
    }

    //토큰 인증
    async valid(token) {
        const response = await fetch(this.baseURL + "/api/account/valid", {
            ...this.postOption,
            body: JSON.stringify({ token })
        })

        return await response.json();
    }

    //회원가입 등록
    async register(email, password, name, gender, birth ) {
        const response = await fetch(this.baseURL + "/api/account/register", {
            ...this.postOption,
            body: JSON.stringify({ email, password, name, gender, birth })
        })

        
        return await response.json();
    }


}

export default AccountAPI;