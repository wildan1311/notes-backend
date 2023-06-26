const InvariantError = require("../../exception/InvariantError");
const { notesSchema } = require("./schema")

const NotesValidator = {
    validateNotePayload: (payload) => {
        const validationResult = notesSchema.validate(payload);
        if(validationResult.error){
            throw new InvariantError(validationResult.error.message);
        }
    },
}

module.exports = { NotesValidator }