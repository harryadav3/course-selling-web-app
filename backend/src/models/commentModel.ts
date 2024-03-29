import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';
import Lead from './leadModel';

class Comment extends Model {
    public id!: number;
    public comment!: string;
    public leadId!: number;
    public instructorId!: number;
}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    leadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    instructorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Comment',
    sequelize,
});

Lead.hasMany(Comment, { foreignKey: 'leadId' });
Comment.belongsTo(Lead, { foreignKey: 'leadId' });

export default Comment;