export const env = {
  DATABASE_URL: process.env.DATABASE_URL || "file:./database.sqlite",
  NODE_ENV: process.env.NODE_ENV || "development",
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
