import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TrabajadorModule } from './trabajador/trabajador.module';
import { TipoAnotacionModule } from './tipo-anotacion/tipo-anotacion.module';
import { PagoModule } from './pago/pago.module';
import { PadreModule } from './padre/padre.module';
import { PensionModule } from './pension/pension.module';
import { NotasModule } from './notas/notas.module';
import { MatriculaModule } from './matricula/matricula.module';
import { InformeModule } from './informe/informe.module';
import { GradoModule } from './grado/grado.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { CursoModule } from './curso/curso.module';
import { CronogramaModule } from './cronograma/cronograma.module';
import { AulaModule } from './aula/aula.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { AnotacionModule } from './anotacion/anotacion.module';
import { ActividadModule } from './actividad/actividad.module';

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuración de TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'NidoPro',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development', // Solo en desarrollo
      logging: process.env.NODE_ENV === 'development', // Logs en desarrollo
    }),

    // Módulos de la aplicación
    RolModule,
    ActividadModule,
    AnotacionModule,
    AsistenciaModule,
    AulaModule,
    CronogramaModule,
    CursoModule,
    EstudianteModule,
    EvaluacionModule,
    GradoModule,
    InformeModule,
    MatriculaModule,
    NotasModule,
    PadreModule,
    PagoModule,
    PensionModule,
    TipoAnotacionModule,
    TrabajadorModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }