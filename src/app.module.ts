import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import * as path from 'path'
import * as fs from 'fs'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: determineEnvFile(), }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

function determineEnvFile(): string {
  const envPath = path.resolve(process.cwd(), '.env.local')
  return fs.existsSync(envPath) ? '.env.local' : '.env'
}