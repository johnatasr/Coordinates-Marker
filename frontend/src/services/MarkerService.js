import api from './Api'


class MarkerService {
    constructor(){
        this.api = api
    }

    async getMarkers(){
        try{
            const response = await this.api.get('get-markers')
            return response
        } catch(err) {
            throw err
        }
    }

    async getMarker(id){
        try{
            const response = await this.api.get(`get-marker/${id}`)
            return response
        } catch(err) {
            throw err
        }
    }

    async createMarker(data){
        try{
            const response = await this.api.post('create-marker', {data: data})
            return response
        } catch(err) {
            throw err
        }
    }

    async updateMarker(data){
        try{
            const response = await this.api.put(`update-marker/${data.id}`, {data: data})
            return response
        } catch(err) {
            throw err
        }
    }

    async deleteMarker(id){
        try{
            const response = await this.api.delete(`delete-marker/${id}`)
            return response
        } catch(err) {
            throw err
        }
    }


}

export default MarkerService;