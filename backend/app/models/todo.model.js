const {sequelize,DataTypes}=require('sequelize');

const Todo=sequelize.define('todos',{
    title:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    status:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },



    })
    (async () => {
        try {
          await Todo.sync();
          console.log("Todo table created successfully");
        } catch (err) {
          console.error("Error syncing Todo table:", err);
        }
      })();

        
module.exports=Todo;
