const SECRET_KEY = process.env.JWT_SECRET;
const EXPIRES_IN = "24h";

const config = {
  SECRET_KEY,
  EXPIRES_IN,
};

export { config };
