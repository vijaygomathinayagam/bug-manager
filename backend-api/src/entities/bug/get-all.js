const { bugModal } = require('./modal');

module.exports = async () => {
  return await bugModal
    .find({})
    .limit(10)
    .sort({ createdAt: -1 })
    .select({ bugId: 1, title: 1, reportedBy: 1, assignedBy: 1});
};