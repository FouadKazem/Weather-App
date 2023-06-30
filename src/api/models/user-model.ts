import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URI as string)
const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    first_name: {
        type: DataTypes.STRING(20),
        validate: {
            len: {
                args: [2, 20],
                msg: 'First name must contain between [2, 20] characters'
            }
        },
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(20),
        validate: {
            len: {
                args: [2, 20],
                msg: 'Last name must contain between [2, 20] characters'
            }
        },
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                msg: 'Please provide a valid email address'
            }
        },
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(64),
        validate: {
            customValidator(value: string) {
                if (value.length < 8 || value.length > 64) {
                    throw new Error('Password length must be between [8, 64] characters')
                }
                let numsCounter = 0
                let charsCounter = 0
                for (let char of value.toLocaleLowerCase()) {
                    for (let i = '0'.charCodeAt(0); i <= '9'.charCodeAt(0); i++) {
                        if (char == String.fromCharCode(i)) {
                            numsCounter++
                            break
                        }
                    }
                    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
                        if (char == String.fromCharCode(i)) {
                            charsCounter++
                            break
                        }
                    }
                }
                if (numsCounter == 0 || charsCounter == 0) {
                    throw new Error('Password must contain at least one character and at least one number')
                }
            }
        },
        allowNull: false
    },
    cities: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
}, { freezeTableName: true })

export default User