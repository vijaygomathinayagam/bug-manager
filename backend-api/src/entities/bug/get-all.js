const { bugModel } = require('./modal');

module.exports = async (filter) => {
  const bugsArr = await bugModel
    .find(filter)
    .limit(10)
    .sort({ createdAt: -1 })
    .select({ bugId: 1, title: 1, reportedBy: 1, assignedBy: 1});

  const totalCount = await bugModel.countDocuments();

  return {
    bugs: bugsArr,
    totalCount: totalCount,
  };
};