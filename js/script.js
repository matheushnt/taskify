import isTruncada from './modules/is-truncada.js';

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

const adicionarTarefa = (event) => {
  event.preventDefault();

  const descricao = inputAdicionarTarefa.value.trim();

  if (!descricao) {
    alert('Você precisa informar uma tarefa válida');

    return;
  }

  const tarefaDuplicada = tarefas.some((tarefa) => tarefa.descricao === descricao);

  if (tarefaDuplicada) {
    alert('Essa tarefa já foi adicionada');
    inputAdicionarTarefa.focus();

    return;
  }

  const novaTarefa = criarTarefa(descricao);
  tarefas.push(novaTarefa);
  renderizarTarefas();

  inputAdicionarTarefa.value = '';
  inputAdicionarTarefa.focus();
};

const deletarTarefa = (id) => {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  renderizarTarefas();
};

const handleClick = (event) => {
  const alvo = event.target;

  const botaoExcluir = alvo.closest('.lixeira-icone');

  if (botaoExcluir) {
    const li = botaoExcluir.closest('li');
    const id = li.getAttribute('data-id');
    deletarTarefa(id);

    return;
  }

  const spanDescricao = alvo.closest('.tarefa-descricao');

  if (spanDescricao) {
    const li = spanDescricao.closest('li');
    const id = li.getAttribute('data-id');
    const tarefa = tarefas.find((tarefa) => tarefa.id === id);

    if (!tarefa) return;

    if (isTruncada(spanDescricao)) {
      const paragrafo = containerModal.querySelector('p');
      paragrafo.textContent = tarefa.descricao;
      toggleModal();
    } else {
      tarefa.finalizada = !tarefa.finalizada;
      renderizarTarefas();
    }
  }
};

formTarefa.addEventListener('submit', adicionarTarefa);
containerTarefas.addEventListener('click', handleClick);
