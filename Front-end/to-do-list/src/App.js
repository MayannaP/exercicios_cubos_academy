import { useState } from 'react';
import close  from './assets/delete.svg'

function Tarefa(props) {
  return (
      <li className={`list-item`} >
      <span 
      onClick={() => props.handleComplete(props.id, this)}
      style={{textDecoration: (props.complete ? 'line-through' : ''), color: (props.complete? '#D1D2DA' :'#494C6B')}}>
        {props.children} 
      </span>
      <button onClick={()=>props.handleDelete(props.id)}> 
      <img src={ close } alt="" />
      </button>
    </li>
  )
}

function ListOptions(props) { 
  return(
    <ul className='list-options'>
      <li onClick={()=>props.handleShowAll(props.tarefas)}  className={props.activeFilter === 'All'? 'selected' : ''} >Todas</li>
      <li onClick={()=>props.handleShowActive(props.tarefas)} className={props.activeFilter === 'Active'? 'selected' : ''} >Ativas</li>
      <li onClick={()=>props.handleShowComplete(props.tarefas)} className={props.activeFilter === 'Complete'? 'selected' : ''} >Completas</li>
    </ul>
  )
}

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefasMostradas, setTarefasMostradas] = useState([])
  const [id, setId] = useState(1);
  const [activeFilter, setActiveFilter ] = useState('All')

  function handleComplete(id) {
    const novasTarefas = [...tarefas]
    const tarefaCompleta = novasTarefas.find(tarefa => tarefa.id === id)
    tarefaCompleta.complete = !tarefaCompleta.complete

    setTarefas(novasTarefas)
    setTarefasMostradas(novasTarefas)
  }
  
  function handleDelete(id) {
    const novasTarefas = tarefas.filter(t => t.id !== id)
    setTarefas(novasTarefas);
    setTarefasMostradas(novasTarefas);
  }
  
  function handleKeyDown(event) { 
    if (event.key !== 'Enter') return;

    const novasTarefas = [...tarefas, { id, text: event.target.value, complete: false}]

    if (activeFilter !== "Complete") { 
      const novasTarefasMostradas = [...tarefasMostradas, { id, text: event.target.value, complete: false}]
      setTarefasMostradas(novasTarefasMostradas)
    }
  
    setId(id + 1);
    setTarefas(novasTarefas)
    
    event.target.value ='';
  }

  function countCompletas(tarefas) {
    const tarefasCompletas = tarefas.filter(tarefa=> !tarefa.complete)

    return <span>{tarefasCompletas.length}</span>
  }

  function handleDeleteComplete(tarefas) {
    const tarefasNaoConcluidas = tarefas.filter(tarefa => !tarefa.complete)
    setTarefas(tarefasNaoConcluidas);
    setTarefasMostradas(tarefasNaoConcluidas);
  }

  function handleShowActive(tarefas) {
    setActiveFilter("Active")
    const tarefasAtivas = tarefas.filter(tarefa => !tarefa.complete);
    setTarefasMostradas(tarefasAtivas)
  }

  function handleShowComplete(tarefas) {
    setActiveFilter("Complete")
    const tarefasCompletas = tarefas.filter(tarefa => tarefa.complete)
    setTarefasMostradas(tarefasCompletas)
  }

  function handleShowAll(tarefas) {
    setActiveFilter("All")
    tarefas.forEach(tarefa => tarefa.show = true);
    setTarefasMostradas(tarefas)
  }

  return (
    <div className="App">
      <h2>TAREFAS</h2>
      <input type="text" onKeyDown={handleKeyDown} placeholder='Criar uma nova tarefa'/>
      <ul className='list'> 
      {tarefasMostradas.map(tarefa => { 
        return(
          <Tarefa
            key={tarefa.id}
            id={tarefa.id}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
            complete={tarefa.complete}
            tarefas={tarefas}
            show={tarefa.show}
          >
            {tarefa.text}
          </Tarefa>
        ) 
      })}

      <li className='list-footer'> 
        <span>{countCompletas(tarefas)} restantes</span>
        {/*<select name="options" id="">
          <option value="all" selected={true}>Todas</option>
          <option value="active">Ativas</option>
          <option value="complete">Completas</option>
        </select> */}
        <ListOptions 
          handleShowAll={handleShowAll}
          handleShowActive={handleShowActive}
          handleShowComplete={handleShowComplete}
          tarefas={tarefas}
          activeFilter={activeFilter}
        >
        </ListOptions>
        <span className="limpar-lista" onClick={()=>handleDeleteComplete(tarefas)} >Limpar completas</span>
      </li>

      </ul> 
    </div>
  );
}

export default App;
