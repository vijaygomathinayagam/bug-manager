module.exports = async (bug, updatedBugObject) => {
    const updatedBugObjectKeys = Object.keys(updatedBugObject);
    for (const updatedBugObjectKey of updatedBugObjectKeys) {
        bug[updatedBugObjectKey] = updatedBugObject[updatedBugObjectKey];
    }

    await bug.save();
};