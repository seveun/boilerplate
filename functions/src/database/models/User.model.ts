import {
  DataTypes,
  Model,
  InferAttributes,
  CreationOptional,
} from '@sequelize/core';
import {
  Attribute, PrimaryKey, AutoIncrement, NotNull,
} from '@sequelize/core/decorators-legacy';

// eslint-disable-next-line no-use-before-define
export class User extends Model<InferAttributes<User>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare firstName: string;

  @Attribute(DataTypes.STRING)
  declare lastName: string | null;
}
