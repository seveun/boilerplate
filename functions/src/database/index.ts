import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { User } from '@/database/models/User.model';

let sequelize: Sequelize;

export const init = async () => {
  sequelize = await new Sequelize({
    dialect: PostgresDialect,
    url: process.env.DATABASE_URL,
    define: {
      underscored: true,
    },
    models: [User],
  });
  await sequelize.sync({ force: true });
  console.log('Database initialized');
};

export {
  User,
  sequelize,
};
