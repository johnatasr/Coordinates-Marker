
function ValidPayload(payload){
    try{
        for (let i = 0; i <= payload.length; i++){
            if (payload[i] === '' || payload[i] === null){
                throw Error
            }
        }
        return true

    } catch(err) {
        console.log(err)
        return false
    }
}