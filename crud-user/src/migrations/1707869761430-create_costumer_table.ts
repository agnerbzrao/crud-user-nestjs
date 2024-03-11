import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Status } from 'src/costumer/enum/status.enum';
export class CreateCostumerTable1707869761430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'costumer',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'costumer_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'costumer_email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'costumer_image',
            type: 'varchar',
            isNullable: false,
            default: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: [Status.ACTIVE, Status.INACTIVE],
            enumName: 'statusEnum',
            isNullable: false,
            default: `"${Status.INACTIVE}"`,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('costumer');
  }
}
