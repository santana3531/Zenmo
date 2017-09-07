// Dependencies
// =============================================================

// Creates a "User" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        current_balance: {
            type: DataTypes.DECIMAL
        },
        logged_in: {
            type: DataTypes.BOOLEAN
        }
    });


    // User.associate = function(models) {
    //     User.hasMany(models.Transaction, {
    //         onDelete: "cascade"
    //     });

    // };

    return User;

};