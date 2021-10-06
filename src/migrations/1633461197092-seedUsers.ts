import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class seedUsers1633461197092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    const usersTable = new Table({
      name: 'users',
      columns: [
        { name: 'id', type: 'uuid', default: 'uuid_generate_v4 ()' },
        { name: 'firstname', type: 'varchar(20)' },
        { name: 'lastname', type: 'varchar(20)' },
      ],
    });
    queryRunner.createTable(usersTable);

    const users = [
      ['John', 'A'],
      ['Bjorn', 'C'],
      ['Maciek', 'L'],
    ];

    const demoUsers = [
      ['Demo', 'User1'],
      ['Demo', 'User2'],
      ['Demo', 'User3'],
      ['Demo', 'User4'],
    ];

    const currentDb = await queryRunner.getCurrentDatabase();

    (currentDb === 'poc' ? users : demoUsers).forEach(
      ([firstName, lastName]) => {
        queryRunner.query(`
        INSERT INTO users (firstname, lastname)
        VALUES ('${firstName}','${lastName}')`);
      },
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('users');
  }
}
