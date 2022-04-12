/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require("dotenv").config();
const path = require("path");

const {
  DATABASE_URL = "postgres://zfbobdvu:aixdSnAL2L5ziI9wOxKA_1bXzVgQMG2n@hansken.db.elephantsql.com/zfbobdvu",
  DATABASE_URL_DEVELOPMENT = "postgres://fxfwxvry:FOna52Jw1w6s32wwBzES0-xg1l2cevjd@hansken.db.elephantsql.com/fxfwxvry",
  DATABASE_URL_TEST = "postgres://yfiqlppc:MisQmtVzWXT4Z0kijdRPBPb3afyYfWLd@hansken.db.elephantsql.com/yfiqlppc",
  DATABASE_URL_PREVIEW = "postgres://ideetfao:i4IYelVav2kE4nPk6Mne5Xxz35MxM3mG@hansken.db.elephantsql.com/ideetfao",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
