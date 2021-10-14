const { query } = require("../conexao");

async function createProduct({
  usuario_id,
  nome,
  quantidade,
  categoria,
  preco,
  descricao,
  imagem,
}) {
  return (
    await query(
      "INSERT INTO produtos (usuario_id, nome, quantidade, categoria, preco, descricao, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [usuario_id, nome, quantidade, categoria, preco, descricao, imagem]
    )
  ).rows;
}

async function getProduct({ usuario_id, id }) {
  if (!id) {
    return (
      await query("SELECT * FROM produtos WHERE usuario_id=$1", [usuario_id])
    ).rows;
  }
  return (await query("SELECT * FROM produtos WHERE id=$1", [id])).rows[0];
}

async function getProductByCategory({ usuario_id, categoria }) {
  return (
    await query("SELECT * FROM produtos WHERE usuario_id=$1 AND categoria=$2", [
      usuario_id,
      categoria,
    ])
  ).rows;
}

async function updateProduct(product, id) {
  const { nome, quantidade, categoria, preco, descricao, imagem } = product;
  return (
    await query(
      "UPDATE produtos SET nome=$1, quantidade=$2, categoria=COALESCE($3, categoria), preco=$4, descricao=$5, imagem= COALESCE($6, imagem) WHERE id=$7",
      [nome, quantidade, categoria, preco, descricao, imagem, id]
    )
  ).rows;
}

async function deleteProduct(id) {
  return await query("DELETE FROM produtos WHERE id=$1", [id]);
}

module.exports = {
  createProduct,
  getProduct,
  getProductByCategory,
  updateProduct,
  deleteProduct,
};
