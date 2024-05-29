import { query } from '../../database';

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await query(
      `SELECT contacts.*, categories.name as category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY contacts.name ${direction}`,
    );

    return rows;
  }

  async findById(id) {
    const [row] = await query(
      `SELECT contacts.*, categories.name as category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1 `,
      [id],
    );

    return row;
  }

  async findByEmail(email) {
    const [row] = await query('SELECT * FROM contacts WHERE email = $1', [
      email,
    ]);

    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await query(
      `
    INSERT INTO contacts (name, email, phone, category_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
      [name, email, phone, category_id],
    );

    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await query(`
    UPDATE contacts
    SET name = $1, email = $2, phone = $3, category_id = $4
    WHERE id = $5
    RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await query('DELETE FROM contacts WHERE id = $1', [id]);

    return deleteOp;
  }
}

export default new ContactsRepository();
