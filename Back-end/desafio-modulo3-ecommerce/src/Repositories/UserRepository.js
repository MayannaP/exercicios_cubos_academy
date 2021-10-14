const { query } = require("../conexao");

async function getUser(filtros) {
  let selectQuery = "SELECT * FROM usuarios ";
  const params = [];

  if (filtros.email) {
    selectQuery += `WHERE email = $${params.length + 1}`;
    params.push(filtros.email);
  }

  if (filtros.id) {
    selectQuery += `WHERE id = $${params.length + 1}`;
    params.push(filtros.id);
  }
  return (await query(selectQuery, params)).rows[0];
}

async function insertUser({ nome, email, senhaCriptografada, nome_loja }) {
  return (
    await query(
      "INSERT INTO usuarios (nome, email, senha, nome_loja) VALUES ($1, $2, $3, $4)",
      [nome, email, senhaCriptografada, nome_loja]
    )
  ).rowCount;
}

async function updateUser({ id, nome, email, senhaCriptografada, nome_loja }) {
  return (
    await query(
      "UPDATE usuarios SET nome=$1, email=$2, senha=$3, nome_loja=$4 WHERE id=$5",
      [nome, email, senhaCriptografada, nome_loja, id]
    )
  ).rowCount;
}

module.exports = { getUser, insertUser, updateUser };
