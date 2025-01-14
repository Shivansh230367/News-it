const zod = require("zod");

const saveBody = zod.object({
    title: zod.string().optional(),
    details: zod.string()
});

const updateBody = zod.object({
    title: zod.string().optional(),
    details: zod.string()
});

module.exports = {
    saveBody,
    updateBody
}