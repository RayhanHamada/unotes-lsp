const constants = {
  IS_PROD: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  JWT_SECRET: process.env.JWT_SECRET!,
};

export default constants;
