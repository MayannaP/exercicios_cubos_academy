import './Registro.css';
import '../../global.css'
import pen from '../../assets/pen.svg'
import trash from '../../assets/trash-can.svg'
import Modal from '../Modal/Modal'
import { useState } from 'react';
import api from '../../util/dindinApi';
import { format } from 'date-fns';


export default function Registro(props) {
  const setRegistroUpdate = props.setRegistroUpdate;

  const [modal, setModal] = useState(false)
  const [popup, setPopup] = useState(false)
  
  function handleClickPopup() {
    const popupStatus = popup ? false : true;
    setPopup(popupStatus)
  }

  function handleClickDelete() {
    (async ()=> { 
      await api.delete(`/transactions/${props.id}`);
      setRegistroUpdate(true)
    })();
  }

  return (
    <tr className="table-line">
      <td className="line-items registro__data">{(new Date(props.data)).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
      <td className="line-items registro__dia">{props.dia}</td>
      <td className="line-items registro__descricao">{props.descricao}</td>
      <td className="line-items registro__categoria">{props.categoria}</td>
      <td className={`line-items ${props.type==='credit'? 'in' : 'out'}`}>R$ {(props.valor/100).toFixed(2)}</td>
      <td className="line-items options">
        <img src={pen} className="edit-icon" onClick={()=>setModal(true)} alt="caneta" />
        <img src={trash} className="delete-icon" onClick={()=>handleClickPopup()} alt="lixeira" />
        { 
          popup && (
            <div className="container-confirm-delete"> 
              <span>Apagar item?</span>
              <div>
                <button className="btn-actions-confirm-delete blue-button" onClick={handleClickDelete}>Sim</button>
                <button className="btn-actions-confirm-delete red-button" onClick={()=>setPopup(false)}>Não</button>
              </div>
            </div>
          )
        }
        { modal && <Modal title='Editar Registro' setModal={setModal}  setRegistroUpdate={setRegistroUpdate} id={props.id} />}
      </td>
    </tr>
  )
}
