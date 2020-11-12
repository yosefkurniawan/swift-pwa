const { mergeSchemas } = require('@graphql-tools/merge');
const SwiftRemoteSchema = require('./remote');
const AuthSchema = require('./schema/index');

const executor = async () => {
    const SwiftSchema = await SwiftRemoteSchema();

    const schemas = mergeSchemas({
        schemas: [AuthSchema, SwiftSchema],
    });

    return schemas;
};

module.exports = executor;
