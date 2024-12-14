import * as mysql from 'mysql2/promise';

export const dbConnection = mysql.createPool({
  host: 'bsgymph2iqvvqrnia5pu-mysql.services.clever-cloud.com',
  user: 'u3g0v5ifv2f3tjfi',
  password: 'Hkmqa7jlTMABJi8TFD26',
  database: 'bsgymph2iqvvqrnia5pu',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
