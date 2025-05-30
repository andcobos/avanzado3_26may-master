import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',           
      password: 'Colita2010',           
      database: 'avanzado3_26may',   
      entities: [User],
      synchronize: true,              
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
