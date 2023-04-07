const ChatDaoDb = require ('../daos/ChatDaoDb.js')
const ChatDTO = require ('../dtos/mensajesDTO.js')

module.exports = class ChatRepository extends ChatDaoDb {
    constructor() {
        super()
    }
    async listAll() {
            const data = await this.getChat()
            const mensajes = new ChatDTO(data)
            return mensajes.normalize();
    }

    async save (object) {
        const data = await this.saveChat(object)
        return data
    }
}