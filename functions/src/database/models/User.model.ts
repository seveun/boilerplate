import {
  Attribute, PrimaryKey, NotNull, Default,
} from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes } from '@sequelize/core';
import { User as UserType } from '@/schemas/User.schema';

// eslint-disable-next-line no-use-before-define
export class User extends Model<InferAttributes<User>> implements UserType {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @NotNull
  declare id: string;

  @Attribute(DataTypes.STRING)
  declare email: string | null;

  @Attribute(DataTypes.STRING)
  declare username: string | null;

  @Attribute(DataTypes.STRING)
  declare image: string | null;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare emailVerified?: boolean;

  @Attribute(DataTypes.ENUM('active', 'ban', 'disabled'))
  declare status: 'active' | 'ban' | 'disabled';

  @Attribute(DataTypes.STRING)
  declare firebaseId: string;
}
