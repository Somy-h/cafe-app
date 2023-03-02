module.exports.insertAddress = async (pool, addrData) => {
  const [addr] = await req.db.query(
    'INSERT INTO address SET ?',
    [addrData]
  );
  return  addr.insertId;
};

module.exports.updateAddress = async (pool, addrData) => {
  await req.db.query(
    'UPDATE address SET ?',
    [addrData]
  );
};