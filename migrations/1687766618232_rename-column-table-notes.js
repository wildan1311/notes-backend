/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('notes', 'updatedAt', 'updated_at');
    pgm.renameColumn('notes', 'createdAt', 'created_at');
};

exports.down = pgm => {
    pgm.renameColumn('notes', 'updated_at', 'updatedAt');
    pgm.renameColumn('notes', 'created_at', 'createdAt');
};
