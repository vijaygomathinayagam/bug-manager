module.exports.parseHTMLTemplate = (htmlString, variables) => {
    let replacedString = htmlString;
    for (const key in variables) {
        replacedString = replacedString.replace(new RegExp(`#{${key}}`, 'g'), variables[key]);
    }
    return replacedString;
};