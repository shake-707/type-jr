

export const get_secret_key = () => {
  const secret_key = process.env.SECRET_KEY;
  if (!secret_key) {
    console.error('failed to get enviroment secret key');
    process.exit(1);
  }
  return secret_key;
};

export const get_db_url = () => {
    const db_url = process.env.DATABASE_URL;
    if (!db_url) {
        console.error('fained to db environemnt url');
        process.exit(1);
    }
    return db_url
}
