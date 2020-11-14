import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1605226200123 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE orphanages (id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50), latitude DECIMAL(10,2), longitude DECIMAL(10,2), about TEXT, instructions TEXT, opening_hours VARCHAR(30), pending BOOLEAN DEFAULT false, user_id VARCHAR(35), open_on_weekends BOOLEAN DEFAULT false, CONSTRAINT OrphanagePublisher FOREIGN KEY (user_id) REFERENCES users(id)) ENGINE=InnoDB");

        // await queryRunner.createTable(new Table({
        //     name: 'orphanages',
        //     engine: 'InnoDB',
        //     columns: [
        //         {
        //             name: 'id',
        //             type: 'integer',
        //             unsigned: true,
        //             isPrimary: true,
        //             isGenerated: true,
        //             generationStrategy: 'increment'
        //         },
        //         {
        //             name: 'name',
        //             type: 'varchar'
        //         },
        //         {
        //             name: 'latitude',
        //             type: 'decimal',
        //             scale: 2,
        //             precision: 10
        //         },
        //         {
        //             name: 'longitude',
        //             type: 'decimal',
        //             scale: 2,
        //             precision: 10
        //         },
        //         {
        //             name: 'about',
        //             type: 'text'
        //         },
        //         {
        //             name: 'instructions',
        //             type: 'text'
        //         },
        //         {
        //             name: 'opening_hours',
        //             type: 'varchar'
        //         },
        //         {
        //             name: 'pending',
        //             type: 'boolean',
        //             default: false
        //         },
        //         {
        //             name: 'user_id',
        //             type: 'varchar',
        //             isNullable: false,
        //             isUnique: false,
        //         },
        //         {
        //             name: 'open_on_weekends',
        //             type: 'boolean',
        //             default: false
        //         }
        //     ],
        //     foreignKeys: [
        //         {
        //             name: 'OrphanagePublisher',
        //             columnNames: ['user_id'],
        //             referencedTableName: 'users',
        //             referencedColumnNames: ['id'],
        //             onDelete: 'CASCADE'
        //         }
        //     ]
        // }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanages');
    }

}
