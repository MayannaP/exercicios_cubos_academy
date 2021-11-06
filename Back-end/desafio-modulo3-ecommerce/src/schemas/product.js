
const yup = require('yup'); 
const { pt } = require('yup-locales');
yup.setLocale(pt); 

const createProductSchema = yup.object().shape({
  nome: yup.string().strict().required('O nome do produto é obrigatório'),
  quantidade: yup.number().strict().required('A quantidade é obrigatória'),
  categoria: yup.string().required('A categoria é obrigatória'),
  preco: yup.number().strict().required('O preço é obrigatório'),
  descricao: yup.string(),
  imagem: yup.string()
})

const updateProductSchema = yup.object().shape({
  nome: yup.string().strict().required('O nome do produto é obrigatório'),
  quantidade: yup.number().strict().required('A quantidade é obrigatória'),
  categoria: yup.string().required('A categoria é obrigatória'),
  preco: yup.number().strict().required('O preço é obrigatório'),
  descricao: yup.string(),
  imagem: yup.string()
})

module.exports = { createProductSchema, updateProductSchema }