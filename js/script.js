import isTruncada from './modules/is-truncada.js';

const formTarefa = document.querySelector('.form-tarefa');
const inputAdicionarTarefa = document.querySelector('.tarefa-input');
const containerTarefas = document.querySelector('.container-tarefas');
const textoInfo = document.querySelector('.texto-info');
const containerModal = document.querySelector('[data-container-modal]');
const btnFecharModal = document.querySelector('[data-fechar-modal]');
const templateTarefa = document.querySelector('#template-tarefa');

let tarefas = [];

const salvarTarefas = () => {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
};

const carregarTarefas = () => {
  const tarefasSalvas = localStorage.getItem('tarefas');
  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
    renderizarTarefas();
  }
};

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
  salvarTarefas();
  renderizarTarefas();

  inputAdicionarTarefa.value = '';
  inputAdicionarTarefa.focus();
};

const deletarTarefa = (id) => {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  salvarTarefas();
  renderizarTarefas();
};

const alternarFinalizacao = (id) => {
  const tarefa = tarefas.find((tarefa) => tarefa.id === id);

  if (!tarefa) return;

  tarefa.finalizada = !tarefa.finalizada;
  salvarTarefas();

  const li = containerTarefas.querySelector(`[data-id="${id}"]`);
  const checkbox = li.querySelector('.tarefa-checkbox');
  checkbox.checked = tarefa.finalizada;
};

const abrirModal = (descricaoCompleta) => {
  const paragrafo = containerModal.querySelector('[data-descricao-completa]');
  paragrafo.textContent = descricaoCompleta;
  containerModal.classList.add('ativo');
};

const fecharModal = () => {
  containerModal.classList.remove('ativo');
};

const cliqueForaModal = (event) => {
  if (event.target.classList.contains('container-modal')) {
    fecharModal();
  }
};

const handleClick = (event) => {
  const alvo = event.target;
  const li = alvo.closest('li');

  if (!li) return;

  const id = li.dataset.id;

  const botaoExcluir = alvo.closest('.lixeira-icone');
  if (botaoExcluir) {
    deletarTarefa(id);
  }

  const spanDescricao = alvo.closest('.tarefa-descricao');
  if (spanDescricao) {
    if (isTruncada(spanDescricao)) {
      const tarefa = tarefas.find((tarefa) => tarefa.id === id);

      if (!tarefa) return;

      abrirModal(tarefa.descricao);
    } else {
      alternarFinalizacao(id);
    }
  }
};

formTarefa.addEventListener('submit', adicionarTarefa);

containerTarefas.addEventListener('click', handleClick);

btnFecharModal.addEventListener('click', fecharModal);

containerModal.addEventListener('click', cliqueForaModal);

document.addEventListener('keydown', ({ key }) => {
  if (key === 'Escape' && containerModal.classList.contains('ativo')) {
    fecharModal();
  }
});

carregarTarefas();
