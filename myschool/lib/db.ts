import mysql, { Pool } from 'mysql2/promise';


let pool: Pool;


export function getPool(): Pool {
if (!pool) {
pool = mysql.createPool({
host: process.env.MYSQL_HOST,
port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PASSWORD,
database: process.env.MYSQL_DATABASE,
connectionLimit: 10,
});
}
return pool;
}