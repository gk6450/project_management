import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://gouthamgk2016:Wga8dctFEoKwCu3d@cluster0.uatszai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    AuthModule,
    ProjectsModule,
    UsersModule,
    NotificationsModule
  ],
})
export class AppModule {}
