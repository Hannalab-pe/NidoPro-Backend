import { DataSource } from 'typeorm';
import { seedInitialData } from './initial-data.seed';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'NidoPro',
  entities: [__dirname + '/../../entities/*.entity{.ts,.js}'],
  synchronize: false, // No sincronizar automáticamente
  logging: true,
});

async function runSeeds() {
  try {
    console.log('🚀 Conectando a la base de datos...');
    await dataSource.initialize();
    console.log('✅ Conexión establecida');

    await seedInitialData(dataSource);

    console.log('🏁 Proceso completado');
    process.exit(0);
  } catch (error) {
    console.error('💥 Error:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

runSeeds();