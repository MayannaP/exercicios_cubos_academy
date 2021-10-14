function errorHandler(error, req, res, next) {
  if (error.statusCode) {
    return res.status(error.statusCode).send({ mensagem: error.message });
  }

  return res.status(500).send({ mensagem: "Erro interno no sistema" });
}
module.exports = { errorHandler };
