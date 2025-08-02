const formTarefa = document.querySelector('.form-tarefa');
const inputAdicionarTarefa = document.querySelector('.tarefa-input');
const containerTarefas = document.querySelector('.container-tarefas');
const textoInfo = document.querySelector('.texto-info');
const containerModal = document.querySelector('.container-modal');
const btnFecharModal = document.querySelector('.fechar-modal');
const templateTarefa = document.querySelector('#template-tarefa');

let tarefas = [];

const criarTarefa = (descricao) => ({
  id: crypto.randomUUID(),
  descricao,
  finalizada: false,
});
