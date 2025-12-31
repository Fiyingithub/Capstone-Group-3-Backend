import { Sequelize } from "sequelize";
import ENV from "./env.config.js";

export const sequelize = new Sequelize(ENV.db.name, ENV.db.user, ENV.db.password, {
	host: ENV.db.host,
	dialect: ENV.db.dialect,
	port: Number(ENV.db_port),
	logging: false,
});

