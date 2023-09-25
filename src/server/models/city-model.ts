import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URI as string)
const City = sequelize.define('city', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: '00000000-0000-0000-0000-000000000000'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name_ascii: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    country_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    current_weather: {
        type: DataTypes.JSONB
    },
    hourly: {
        type: DataTypes.JSONB
    },
    daily: {
        type: DataTypes.JSONB
    }
}, { freezeTableName: true })

export default City