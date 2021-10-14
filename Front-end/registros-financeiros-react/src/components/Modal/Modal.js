import './Modal.css'
import api from '../../util/dindinApi.js'
import { useRef, useState } from 'react';

export default function Modal( {title, id, setModal, setRegistroUpdate }) {
  const [valor, setValor] = useState(''); 
  const [categoria, setCategoria] = useState(''); 
  const [data, setData] = useState(''); 
  const [descricao, setDescricao] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [erros, setErros] = useState({ type: false, valor: false, categoria: false, descricao: false, data: false, other: true})

  const valorRef = useRef();
  const categoriaRef = useRef();
  const dataRef = useRef();
  const descricaoRef = useRef();
  function handleSubmit(event) {
    event.preventDefault(); 

    if (!transactionType) { 
      setErros({...erros, type: true})
      return;
    }

    if (!valor) { 
      setErros({...erros, valor: true})
      valorRef.current.focus()
      return;
    }
    
    if (!categoria) { 
      setErros({...erros, categoria: true})
      categoriaRef.current.focus()
      return;
    }
    
    if (!data) { 
      setErros({...erros, data: true})
      dataRef.current.focus()
      return;
    }
    
    if (!descricao) { 
      setErros({...erros, descricao: true})
      descricaoRef.current.focus()
      return;
    }
    

    try {
      const day = new Map([[1, 'Segunda'], [2, 'Terça'], [3, 'Quarta'], [4, 'Quinta'], [5, 'Sexta'], [6, 'Sábado'], [7, 'Domingo']])
      const week_day = day.get(new Date(data).getDay());

      if (id) {
        api.put(`/transactions/${id}`, {
          week_day,
          date: new Date(data),
          description: descricao, 
          category: categoria,
          value: Number(valor)*100,
          type: transactionType
        })
      } else { 
        api.post(`/transactions/`, {
          week_day,
          date: new Date(data),
          description: descricao, 
          category: categoria,
          value: Number(valor)*100,
          type: transactionType
        })
      }
      setModal(false);
      setRegistroUpdate(true); 
    } catch (error) {
      setErros({...erros, other: true})
      console.log(error)
    }
  }
  function handleClickDebit() { 
    setTransactionType('debit') 
    setErros({...erros, type: false})
  }

  function handleClickCredit() { 
    setTransactionType('credit') 
    setErros({...erros, type: false})
  }

    
  return (
    <div className="modal">
      <form action="submit" className="modal-container">
        <h2 className="modal__title">{title} </h2>
        <button className="close-icon" onClick={()=> setModal(false)}>X</button>
        <div className="buttons">
          <button 
            type="button" 
            className={`${transactionType==="credit" ? "button-entrada-selected": ''}  modal__button`} 
            id="credit-button" 
            onClick={handleClickCredit}
          >
            Entrada
          </button>
          <button 
            type="button" 
            className={`${transactionType==="debit" ? "button-saida-selected": ''} modal__button`} 
            id="debit-button" 
            onClick={handleClickDebit}
          >
            Saída
          </button>
        </div>
          {
            erros.type && <span style={{textAlign:'center'}}>Selecione uma das opções acima!</span>
          }
        <label htmlFor="value">Valor</label>
        <input 
          placeholder={`${erros.valor? 'Preencha esse campo!' : ''}`}
          className={`${erros.valor? 'empty-input' : ''}`}
          ref={valorRef}
          type="text" 
          id="value" 
          name="value" 
          onChange={(e)=>setValor(e.target.value)} 
          value={valor} 
          />
        <label htmlFor="category">Categoria</label>
        <input 
          ref={categoriaRef}
          placeholder={`${erros.categoria? 'Preencha esse campo!' : ''}`}
          className={`${erros.categoria? 'empty-input' : ''}`}
          type="text" 
          name="category" 
          id="category" 
          onChange={(e)=>setCategoria(e.target.value)} 
          value={categoria}
          />
        <label htmlFor="date">Data</label>
        <input 
          ref={dataRef}
          placeholder={`${erros.data? 'Preencha esse campo!' : ''}`}
          className={`${erros.data? 'empty-input' : ''}`}
          type="date" 
          name="date" 
          id="date"
          onChange={(e)=>setData(e.target.value)} 
          value={data} 
          />
        <label htmlFor="description">Descrição</label>
        <input 
          ref={descricaoRef}
          placeholder={`${erros.descricao? 'Preencha esse campo!' : ''}`}
          className={`${erros.descricao? 'empty-input' : ''}`}
          type="text" 
          name="description" 
          id="description" 
          onChange={(e)=>setDescricao(e.target.value)} 
          value={descricao}
        />
        <button onClick={handleSubmit} className="btn-insert modal__button">Confirmar</button>
      </form>
    </div>
  )
}