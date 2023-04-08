const ChatDaoDb = require ('../daos/ChatDaoDb.js')
const ChatDTO = require ('../dtos/mensajesDTO.js')

module.exports = class ChatRepository extends ChatDaoDb {
    constructor() {
        super()
    }
    async listAll() {
            const data = await this.getAll()
            const mensajes = new ChatDTO(data)
            return mensajes.readData();
    }

    async save (object) {
        const data = await this.save(object)
        return data
    }
}