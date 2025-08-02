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

const renderizarTarefas = () => {
  containerTarefas.innerHTML = '';

  if (tarefas.length === 0) {
    textoInfo.classList.remove('hidden');
    containerTarefas.classList.remove('ativo');
  } else {
    textoInfo.classList.add('hidden');
    containerTarefas.classList.add('ativo');
  }

  tarefas.forEach((tarefa) => {
    const clone = templateTarefa.content.cloneNode(true);

    const li = clone.querySelector('li');
    li.setAttribute('data-id', tarefa.id);

    const checkbox = clone.querySelector('.tarefa-checkbox');
    checkbox.checked = tarefa.finalizada;

    const spanDescricao = clone.querySelector('.tarefa-descricao');
    spanDescricao.textContent = tarefa.descricao;
    spanDescricao.title = tarefa.descricao;

    containerTarefas.appendChild(clone);
  });
};
