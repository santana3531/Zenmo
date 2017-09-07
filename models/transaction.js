// Dependencies
// =============================================================
// Creates a "Transaction" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    const Transaction = sequelize.define('Transaction', {
        payer_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        transaction_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        dollar_amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        payee_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    // Transaction.associate = function(models) {
    //     Transaction.belongsTo(models.User, {
    //         as: 'payer',
    //         foreignKey: {
    //             //this should be set to the payer as one foreign key and payee as second foreign key using aliases
    //             allowNull: false
    //         },
    //         as: 'payee',
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Transaction;
};