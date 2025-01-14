const zod = require("zod");

const saveBody = zod.object({
    title: zod.string(),
    description: zod.string().optional(),
    source: zod.string(),
    url: zod.string().url()
});


module.exports = {
    saveBody,
};