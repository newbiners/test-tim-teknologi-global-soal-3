const config = {
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'password',
        database: process.env.MYSQL_DATABASE || 'test',
        port: Number(process.env.MYSQL_PORT) || 3306
    }
}


export default config