import { Module } from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostumerController } from './costumer.controller';
import { Costumer } from './entities/costumer.entity';

@Module({
  // Import the TypeOrmModule and specify the entities
  imports: [TypeOrmModule.forFeature([Costumer])],
  providers: [CostumerService],
  controllers: [CostumerController],
})
export class CostumerModule {}
