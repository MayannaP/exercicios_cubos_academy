
const yup = require('yup'); 
const { pt } = require('yup-locales');
yup.setLocale(pt); 

const createUserSchema = yup.object().shape({
  nome: yup.string().strict().required('O nome do usuário é obrigatório'),
  email: yup.string().strict().email().required('O email é obrigatório'),
  senha: yup.string().required('A senha é obrigatória'),
  nome_loja: yup.string().strict().required('O nome da loja é obrigatório')
})

const updateUserSchema = yup.object().shape({
  nome: yup.string().strict(),
  email: yup.string().email(),
  senha: yup.string().strict(),
  nome_loja: yup.string().strict(),
})

module.exports = { createUserSchema, updateUserSchema }