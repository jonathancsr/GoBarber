import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { query } from 'express';

export default class AddAvatarFieldUsers1589838059309
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
