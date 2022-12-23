const { mergeSchemas } = require('@graphql-tools/merge');
const SwiftRemoteSchema = require('./remote');
const CrmRemoteSchema = require('./remote/crm');
const ChatRemoteSchema = require('./remote/chat');
const AuthSchema = require('./schema/index');
const { features } = require('../../../swift.config');

const executor = async () => {
    let schemas = null;
    const SwiftSchema = await SwiftRemoteSchema();
    if (features.crm.enabled) {
        const CrmSchema = await CrmRemoteSchema();
        schemas = mergeSchemas({
            schemas: [AuthSchema, CrmSchema, SwiftSchema],
        });
    } else if (features.chatSystem.enable) {
        const ChatSchema = await ChatRemoteSchema();
        schemas = mergeSchemas({
            schemas: [AuthSchema, ChatSchema, SwiftSchema],
        });
    } else {
        schemas = mergeSchemas({
            schemas: [AuthSchema, SwiftSchema],
        });
    }

    return schemas;
};

module.exports = executor;
