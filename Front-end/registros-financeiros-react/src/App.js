import './App.css';
import './global.css';
import logo from './assets/logo.svg'
import filter from './assets/filter.svg'
import Registro from './components/Registro/Registro.js'
import { useEffect, useState } from 'react';
import Modal from './components/Modal/Modal.js'
import Filters from './components/Filter/Filter.js'
import api from './util/dindinApi.js'
import arrow from './assets/arrow.svg'
import { orderByCategory, orderByDate, orderByDay, orderByDescription, orderByValue } from './util/helpers/orderColumn.js'

function App() {
  const [modal, setModal] = useState(false); 
  const [todosRegistros, setTodosRegistros] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [registroUpdate, setRegistroUpdate] = useState(false);
  const [saldoEntrada, setSaldoEntrada] = useState(0);
  const [saldoSaida, setSaldoSaida] = useState(0);
  const [filterContainer, setFilterContainer] = useState(false); 
  const [categorias, setCategorias] = useState()
  const [order, setOrder] = useState('date');
  
  useEffect(() => {
    (async ()=> { 
      const response = await api.get('/transactions');
      const {data} = response;
      
      data.sort((a, b) => a.date.localeCompare(b.date));
      
      const categorias = data.map(registro => registro.category)
      const todasCategorias = categorias.filter((categoria, index)=> categorias.indexOf(categoria) === index)
      setCategorias(todasCategorias);
      
      calcularSaldo(data)

      setRegistroUpdate(false)
      setTodosRegistros(data);
      setRegistros(data);
    })()
  }, [registroUpdate])
  
  function calcularSaldo(data) {
    if (!data.length) { 
      setSaldoSaida(0);
      setSaldoEntrada(0);
      return;
    }

    let credit = 0;
    let debit = 0; 
    for (let registro of data) { 
      if (registro.type === 'credit') { 
        credit += Number(registro.value); 
      } else { 
        debit += Number(registro.value);
      }
    }
    setSaldoSaida(debit/100); 
    setSaldoEntrada(credit/100); 
  }

  function filtrar(filter) {
    const {dia_da_semana, categoria, valor} = filter;

    const registrosFiltrados = todosRegistros
      .filter(registro => !dia_da_semana.length || dia_da_semana.includes(registro.week_day))
      .filter(registro => !categoria.length || categoria.includes(registro.category))
      .filter(registro => !valor.max || registro.value <= valor.max)
      .filter(registro => !valor.min || registro.value >= valor.min);

    calcularSaldo(registrosFiltrados);
    setRegistros(registrosFiltrados);
  }

  return (
    <div className="App">
      <header className="container-header flex-row">
        <img src={logo} alt="logo" />
        <h1 className="header__title">Dindin</h1>
      </header>

      <main className="container flex-row"> 
        <div className="flex-column">
          <button className="open-filters-button" onClick={()=> setFilterContainer(true)}>
            <img src={filter} alt="filtro" />
            <span>Filtrar</span>
          </button>
          { filterContainer && 
            <Filters 
              categorias={categorias} 
              filtrar={filtrar} 
              setFilterContainer={setFilterContainer} 
              setRegistroUpdate={setRegistroUpdate} 
            />
          }
          <table className="table">
            <thead className="table-head">
              <tr>
                <th className="column-title" onClick={(e)=>orderByDate(e, registros, setOrder, setRegistros)}>
                  Data  
                  { order === 'date' && (
                      <img className="column-title-filter" src={arrow} onClick={e=> e.stopPropagation()} alt="" />
                    )
                  }
                </th>
                <th className="column-title" onClick={(e)=>orderByDay(e, registros, setOrder, setRegistros)}>
                  Dia da semana  
                  {
                    order === 'week_day' && <img className="column-title-filter" src={arrow} onClick={e=> e.stopPropagation()} alt="" />
                  }
                </th>
                <th className="column-title" onClick={(e)=>orderByDescription(e, registros, setOrder, setRegistros)}>
                  Descrição
                  {
                    order === 'description' && <img className="column-title-filter" src={arrow} onClick={e=> e.stopPropagation()} alt="" />
                  }
                  </th>
                <th className="column-title" onClick={(e)=>orderByCategory(e, registros, setOrder, setRegistros)}>
                  Categoria
                  {
                    order === 'category' && <img className="column-title-filter" src={arrow} onClick={e=> e.stopPropagation()} alt="" />
                  }
                </th>
                <th className="column-title" onClick={(e)=>orderByValue(e, registros, setOrder, setRegistros)}>
                  Valor
                  {
                    order === 'value' && <img className="column-title-filter" src={arrow} onClick={e=> e.stopPropagation()} alt="" />
                  }
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="table-body">
              { registros.map(registro => { 
                    return (
                      <Registro 
                      key={registro.id} 
                      id={registro.id} 
                      type={registro.type} 
                      data={registro.date} 
                      dia={registro.week_day} 
                      descricao={registro.description} 
                      valor={registro.value} 
                      categoria={registro.category}
                      registroUpdate={registroUpdate}
                      setRegistroUpdate={setRegistroUpdate}
                    />
                    )
                  })
              }
            </tbody>
          </table>
        </div>
        
        <aside>  
          <div className='container-resume flex-column space-between'>
            <h3 className="resumo__title">Resumo</h3>
            <div className="resumo__spans flex-row space-between">
              <span>Entradas</span>
              <span className='in'>R${saldoEntrada.toFixed(2)}</span>
            </div>
            <div className="resumo__spans flex-row space-between">
              <span>Saídas</span>
              <span className='out'>R${saldoSaida.toFixed(2)}</span>
            </div>
            <div className="balance flex-row space-between">
              <span>Saldo</span>
              <span className="balance-text" >R${(saldoEntrada-saldoSaida).toFixed(2)}</span>
            </div>
          </div>
          <button className="btn-add" onClick={()=>setModal(true)}>Adicionar registro</button>
          {modal && (
            <Modal title='Adicionar Registro' setModal={setModal} setRegistroUpdate={setRegistroUpdate}/>
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
