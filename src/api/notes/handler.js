class NotesHandler {
    constructor(service) {
        this._service = service;

        this.postNoteHandler = this.postNoteHandler.bind(this);
        this.getNotesHandler = this.getNotesHandler.bind(this);
        this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
        this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
        this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
    }

    postNoteHandler(request, h) {
        try {
            const { title = 'untitled', body, tags } = request.payload;
            const noteId = this._service.addNote({
                title,
                body,
                tags
            });

            const response = h.response({
                status: 'success',
                message: 'Catatan berhasil ditambahkan',
                data: {
                    noteId: noteId,
                },
            });
            response.code(201);
            return response;
        }catch(error){
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(500);
            return response;
        }
    }

    getNotesHandler(request, h) {
        const notes = this._service.getNote()

        const response = h.response({
            status: 'success',
            data: {
                notes,
            },
        });
        response.code(200);
        return response;
    }

    getNoteByIdHandler(request,h) {
        try {
            const {id} = request.params;
            const note = this._service.getNoteById(id);
    
            const response = h.response({
                status: 'success',
                data: {
                    note
                },
            });
            response.code(200);
            return response;
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(404);
            return response;
        }
    }

    putNoteByIdHandler(request,h) {
        try{
            const {id} = request.params;
            const {title='untitled', body, tags} = request.payload;
    
            this._service.editNoteById(id, {title, body, tags});
    
            const response = h.response({
                status: 'success',
                message: 'Catatan berhasil diperbarui'
            });
            response.code(200);
            return response;
        }catch(error){
            const response = h.response({
                status: 'fail',
                message: error.message
            });
            response.code(404);
            return response;
        }
    }

    deleteNoteByIdHandler(request, h) {
        try {
            const {id} = request.params;

            this._service.deleteNoteById(id);

            const response = h.response({
                status: 'success',
                message: 'Catatan berhasil dihapus'
            });
            response.code(200);
            return response;
        }catch(error){
            const response = h.response({
                status: 'fail',
                message: error.message
            });
            response.code(404);
            return response;
        }
    }
}

module.exports = NotesHandler;