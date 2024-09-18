const crypto = require('crypto');
hashedCode = (code) => {
    const hashedCode = crypto
        .createHash("sha256")
        .update(code)
        .digest("hex");
    return hashedCode;
};
module.exports = hashedCode;