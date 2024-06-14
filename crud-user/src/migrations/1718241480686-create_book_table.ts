import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';


export class CreateBookTable1718241480686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'book',
                columns: [
                    {
                        name: 'id',
                        type: 'int4',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'student_id',
                        type: 'int4',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );
        await queryRunner.createForeignKey(
            "book",
            new TableForeignKey({
                columnNames: ["student_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "student",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("book")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("student_id") !== -1,
        )
        await queryRunner.dropForeignKey("book", foreignKey)
        await queryRunner.dropTable('book');
    }
}
