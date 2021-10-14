const {
  InvalidArgument,
  Unauthorized,
  NotFound,
} = require("../Middlewares/errorClasses.js");
const query = require("../Repositories/ProductRepository.js");

async function getAll(req, res, next) {
  try {
    const { categoria } = req.query;
    const { id: usuario_id } = req.user;

    if (categoria) {
      const products = await query.getProductByCategory({
        usuario_id,
        categoria,
      });
      return res.status(200).json(products);
    }

    const products = await query.getProduct({ usuario_id });

    res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
}

async function get(req, res, next) {
  try {
    const { id: usuario_id } = req.user;
    const { id } = req.params;

    const product = await query.getProduct({ id });

    if (!product) {
      throw new NotFound(`Não existe produto cadastrado com ID ${id}.`);
    }

    if (product.usuario_id !== usuario_id) {
      throw new Unauthorized(
        "O usuário logado não tem permissão para acessar este produto."
      );
    }

    res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const { id: usuario_id } = req.user;
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;

    if (quantidade <= 0) {
      throw new InvalidArgument(
        "A quantidade de produtos deve ser maior que zero!"
      );
    }

    if (!nome || !quantidade || !categoria || !preco || !descricao || !imagem) {
      throw new InvalidArgument("Todos os parâmetros são obrigatórios!");
    }

    await query.createProduct({
      usuario_id,
      nome,
      quantidade,
      categoria,
      preco,
      descricao,
      imagem,
    });

    res.status(201).json();
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { id: usuario_id } = req.user;
    const { id } = req.params;
    const newProduct = req.body;

    const product = await query.getProduct({ id });
    if (!product) {
      throw new NotFound(`Não existe produto cadastrado com ID ${id}.`);
    }

    if (product.usuario_id !== usuario_id) {
      throw new Unauthorized(
        "O usuário logado não tem permissão para acessar este produto."
      );
    }

    if (
      !newProduct.nome ||
      newProduct.quantidade === "" ||
      !newProduct.preco ||
      !newProduct.descricao
    ) {
      throw new InvalidArgument(
        `Os parâmetros 'nome', 'quantidade', 'preco' e 'descricao' são obrigatórios!`
      );
    }

    await query.updateProduct(newProduct, id);

    res.status(200).json({});
  } catch (error) {
    return next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { id: usuario_id } = req.user;
    const { id } = req.params;
    const product = await query.getProduct({ id });

    if (!product) {
      throw new NotFound(`Não existe produto cadastrado com ID ${id}.`);
    }

    if (product.usuario_id !== usuario_id) {
      throw new Unauthorized(
        "O usuário logado não tem permissão para acessar este produto."
      );
    }

    await query.deleteProduct(id);

    res.status(200).json({});
  } catch (error) {
    return next(error);
  }
}

module.exports = { get, getAll, create, update, deleteProduct };
