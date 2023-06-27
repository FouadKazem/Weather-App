import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URI as string)
const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    cities: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
}, { freezeTableName: true })

export default User