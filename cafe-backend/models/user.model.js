
module.exports.getUserByEmail = async (req, email) => {
  const [[user]] = await req.db.query("SELECT * FROM user WHERE email = ?", [
    email,
  ]);
  //console.log("db return: ", user);
  return user;
};

module.exports.getUserByID = async (req, id) => {
  const [[user]] = await req.db.query(
    "SELECT * FROM user WHERE id = ?",
    [id]
  );
  return user;
};

module.exports.updateUserRefreshToken = async (req, id, refreshToken) => {
  await req.db.query(
    "UPDATE user SET refresh_token = ? WHERE id = ?",
    [refreshToken, id]
  );
};

module.exports.insertUser = async (req, hashPwd) => {
  try {
    const { unit_num, street_num, addr1, addr2, city, state, postal_code } =
      req.body;

    const [addr] = await req.db.query("INSERT INTO address SET ?", {
      unit_num,
      street_num,
      addr1,
      addr2,
      city,
      state,
      postal_code,
    });

    const { email, first_name, last_name, phone, role, refresh_token } =
      req.body;
    const pwd = hashPwd;
    const address_id = addr.insertId;
    const [user] = await req.db.query("INSERT INTO user SET ?", {
      email,
      pwd,
      first_name,
      last_name,
      address_id,
      phone,
      role,
      refresh_token,
    });

    //console.log(user.insertId);
    return { userId: user.insertId, address_id: addr.insertId };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getUserProfile = async (req, userId) => {
  const [[user]] = await req.db.query(
    `SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.pwd,
        u.phone,
        u.role,
        a.unit_num,
        a.street_num,
        a.addr1,
        a.addr2,
        a.city,
        a.state,
        a.postal_code,
        u.address_id
      FROM user u
      INNER JOIN address a ON u.address_id = a.id
      WHERE u.id = ?`,
    [userId]
  );
  return user;
};

module.exports.updateUserProfile = async (req, hash, userId) => {
  try {

    await req.db.query(
      `UPDATE user, address
       SET
          user.first_name = COALESCE(?, user.first_name),
          user.last_name = COALESCE(?, user.last_name),
          user.pwd = COALESCE(?, user.pwd),
          user.phone = COALESCE(?, user.phone),
          user.role = COALESCE(?, user.role),
          address.unit_num = COALESCE(?, address.unit_num),
          address.street_num = COALESCE(?, address.street_num),
          address.addr1 = COALESCE(?, address.addr1),
          address.addr2 = COALESCE(?, address.addr2),
          address.city = COALESCE(?, address.city),
          address.state = COALESCE(?, address.state),
          address.postal_code = COALESCE(?, address.postal_code)
       WHERE user.id =? AND user.address_id = address.id`,
      [
        req.body.first_name,
        req.body.last_name,
        hash,
        req.body.phone,
        req.body.role,
        req.body.unit_num,
        req.body.street_num,
        req.body.addr1,
        req.body.addr2,
        req.body.city,
        req.body.state,
        req.body.postal_code,
        userId,
      ]
    );
  } catch (err) {
    throw new Error(err);
  }
};
