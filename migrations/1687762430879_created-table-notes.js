/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('notes', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey : true
        },
        title: {
            notNull: true,
            type: 'TEXT'
        },
        body: {
            notNull: true,
            type: 'TEXT'
        },
        tags: {
            notNull: true,
            type: 'TEXT[]'
        },
        createdAt: {
            notNull: true,
            type: 'TEXT'
        },
        updatedAt: {
            notNull: true,
            type: 'TEXT'
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('notes');
};
