
export default function ValidPayload(payload){
    try{
        for (var key in payload) {
            if (payload[key] === null && payload[key] == "")
                return false;
        }
        return true;

    } catch(err) {
        console.log(err)
        return false
    }
}

