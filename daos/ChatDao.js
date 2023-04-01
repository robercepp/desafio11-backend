const dbhandler = require ('../classes/dbhandler.js')

module.exports = class ChatDao extends dbhandler {
    constructor() {
        super()
    }
    async listAll() {
            const data = await this.getChat()
            return data;
    }

    async save (object) {
        const data = await this.saveChat(object)
        return data
    }
}