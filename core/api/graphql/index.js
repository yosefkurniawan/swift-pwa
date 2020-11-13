const { mergeSchemas } = require('@graphql-tools/merge');
const SwiftRemoteSchema = require('./remote');
const CrmRemoteSchema = require('./remote/crm');
const AuthSchema = require('./schema/index');
const { features } = require('../../../swift.config');

const executor = async () => {
    const SwiftSchema = await SwiftRemoteSchema();
    const CrmSchema = await CrmRemoteSchema();
    let schemas = null;
    if (features.crm.enabled) {
        schemas = mergeSchemas({
            schemas: [AuthSchema, CrmSchema, SwiftSchema],
        });
    } else {
        schemas = mergeSchemas({
            schemas: [AuthSchema, SwiftSchema],
        });
    }

    return schemas;
};

module.exports = executor;
