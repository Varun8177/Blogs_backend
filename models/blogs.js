module.exports = (sequelize, DataTypes) => {
  const Blogs = sequelize.define("blogs", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    blogImg: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    username: { type: DataTypes.STRING, allowNull: false },
    useremail: { type: DataTypes.STRING, allowNull: false },
  });
  return Blogs;
};
