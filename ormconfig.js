require("dotenv").config();

// const rootDir =
//   process.env.NODE_ENV?.toLowerCase() === "production" ? "dist" : "src";
// console.log(rootDir);

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [
    // rootDir +
    "src/core/infra/data/database/entities/**/*",
    // "dist/core/infra/data/database/entities/**/*.entity.js",
  ],
  migrations: [
    // rootDir +
    "src/core/infra/data/database/migrations/**/*",
  ],
  cli: {
    entitiesDir: "src/core/infra/data/database/entities",
    migrationsDir: "src/core/infra/data/database/migrations",
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
