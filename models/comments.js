module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("comments", {
    text: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    blogId: {
      type: DataTypes.INTEGER,
      references: {
        model: "blogs",
        key: "id",
      },
    },
  });
  return Comments;
};
