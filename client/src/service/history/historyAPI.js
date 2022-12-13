
class HistoryAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
        const token = localStorage.getItem("token");
        this.getOption = {
            method: "get",
            headers: {
                "authorization": "Bearer " + token
            }
        }

        this.postOption = {
            method: "post",
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + token
            }
        }
    }



    //report조회
    async report(logon, range) {
    
        let res = await fetch(this.baseURL + "/api/history/search?start=" + range.start + "&end=" + range.end +"&logon="+logon, {
            ...this.getOption,
        })

        return await res.json();
    }


    async history(pattern, type, money, place, date, category, content, logon) {
        const response = await fetch(this.baseURL + "/api/history/input", {
            ...this.postOption,
            body: JSON.stringify({ pattern, type, money, place, date, category, content, userEmail: logon })
        });

        return await response.json();
    }



    async historyEmail(logon) {
        let res = await fetch(this.baseURL + "/api/history", {
            ...this.postOption,
            body: JSON.stringify({ logon })
        })

        return await res.json("모르겠다");
    }


    async historyMon(month, logon) {
        let res = await fetch(this.baseURL + "/api/history/month?month=" + month + "&logon=" + logon, {
            ...this.getOption,
        })

        return await res.json();
    }


    async historyDel(chkValue) {
        const response = await fetch(this.baseURL + "/api/history/delete", {
            ...this.postOption,
            body: JSON.stringify({ chkValue })
        });

        return await response.json();
    }

}

export default HistoryAPI;