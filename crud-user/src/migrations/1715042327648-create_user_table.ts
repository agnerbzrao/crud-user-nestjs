import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class CreateUserTable1707869761430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'user_email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'user_password',
            type: 'varchar',
            isNullable: false,
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
            default: null,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
