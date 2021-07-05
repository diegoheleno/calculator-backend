import { BclModule } from '@app/bcl';
import { Services } from './services';
import { JwtStrategy } from '@app/bcl/auth/jwt-verify';
import { CommandHandlers } from './commands/handlers';
import { Module } from '@nestjs/common';
import { CalculatorController } from './controllers/calculator.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express/multer';
import { EventHandlers } from './events/handlers';
import { QueriesHandlers } from './queries/handler';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Entities } from "./entity"

// Não é possivel acoplar o depurador automaticamente (npm run start:debug) usando as configs em nodemom.json 
// por causa das referencias aos modulos bcl (são importados como node_modules mas estão fora da pasta node_modules).

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MulterModule.register({ storage: require('multer').memoryStorage() }),
    BclModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [...Entities],
      autoLoadEntities: true,
      migrationsRun: true
    }),
    TypeOrmModule.forFeature([...Entities])
  ],
  controllers: [
    CalculatorController
  ],
  providers: [
    JwtStrategy,
    ...CommandHandlers,
    ...QueriesHandlers,
    ...EventHandlers,
    ...Services,
  ],
  exports: [PassportModule],
})

export class AppModule { }
