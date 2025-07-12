import pgp from 'pg-promise';

const db_url = process.env.DATABASE_URL;

if (!db_url) {
  console.error('failed to get db url');
  process.exit(1);
}

const db = pgp()(db_url);

async () => {
  try {
    const dbConnection = db.connect();
    console.log('connected to db');
  } catch (error) {
    console.error('failed to connect to db', error);
  }
};

export default db;
