import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class seedUsers1633461197092 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('users');
  }
  public async up(queryRunner: QueryRunner): Promise<void> {
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

    users.forEach((user) => {
      const [firstName, lastName] = user;
      queryRunner.query(`
        INSERT INTO users (firstname, lastname)
        VALUES ('${firstName}','${lastName}')`);
    });
  }
}
