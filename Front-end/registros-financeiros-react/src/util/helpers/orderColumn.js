function orderByDate(e, registros, setOrder, setRegistros) {
  const registrosOrdenados = [...registros]; 
  console.log(e.target)
  
  if (e.target.children[0]) { 
    if (e.target.children[0].className === 'arrow-up') { 
      e.target.children[0].className = ''
      registrosOrdenados.sort((b, a) => b.date.localeCompare(a.date));
    } else { 
      registrosOrdenados.sort((a, b) => b.date.localeCompare(a.date));
      e.target.children[0].className = 'arrow-up';
    }
  }
  console.log(registrosOrdenados)
  setOrder('date');
  setRegistros(registrosOrdenados)
}

function orderByDay(e, registros, setOrder, setRegistros) {
  const registrosOrdenados = [...registros]; 
  const day = new Map([['Segunda', 1], ['Terça', 2], ['Quarta', 3], ['Quinta', 4], ['Sexta', 5], ['Sábado', 6], ['Domingo', 7]])
  
  if (e.target.children[0]) { 
    if (e.target.children[0].className === 'arrow-up') { 
      e.target.children[0].className = ''
      registrosOrdenados.sort((b, a) => day.get(b.week_day) - day.get(a.week_day));
    } else { 
      registrosOrdenados.sort((b, a) => day.get(a.week_day) - day.get(b.week_day));
      e.target.children[0].className = 'arrow-up';
    }
  }  else { 
    registrosOrdenados.sort((b, a) => day.get(b.week_day) - day.get(a.week_day));
  }
  setOrder('week_day');
  setRegistros(registrosOrdenados)
}

function orderByDescription(e, registros, setOrder, setRegistros) {
  const registrosOrdenados = [...registros]; 
  
  if (e.target.children[0]) { 
    if (e.target.children[0].className === 'arrow-up') { 
      e.target.children[0].className = ''
      registrosOrdenados.sort((b, a) => b.description.localeCompare(a.description));
    } else { 
      registrosOrdenados.sort((a, b) => b.description.localeCompare(a.description));
      e.target.children[0].className = 'arrow-up';
    }
  } else { 
    registrosOrdenados.sort((b, a) => b.description.localeCompare(a.description));
  }
  setRegistros(registrosOrdenados)
  setOrder('description');
}

function orderByCategory(e, registros, setOrder, setRegistros) {
  const registrosOrdenados = [...registros]; 
  
  if (e.target.children[0]) { 
    if (e.target.children[0].className === 'arrow-up') { 
      e.target.children[0].className = ''
      registrosOrdenados.sort((b, a) => b.category.localeCompare(a.category));
    } else { 
      registrosOrdenados.sort((a, b) => b.category.localeCompare(a.category));
      e.target.children[0].className = 'arrow-up';
    }
  } else { 
    registrosOrdenados.sort((b, a) => b.category.localeCompare(a.category));
  }
  setRegistros(registrosOrdenados)
  setOrder('category');
}

function orderByValue(e, registros, setOrder, setRegistros) {
  const registrosOrdenados = [...registros]; 
  
  if (e.target.children[0]) { 
    if (e.target.children[0].className === 'arrow-up') { 
      e.target.children[0].className = ''
      registrosOrdenados.sort((a,b) => a.value-b.value);
    } else { 
      registrosOrdenados.sort((a, b) => b.value-a.value);
      e.target.children[0].className = 'arrow-up';
    }
  } else {
    registrosOrdenados.sort((a, b) => a.value-b.value);
  } 
  setOrder('value');
  setRegistros(registrosOrdenados)
}

module.exports= { 
  orderByDate,
  orderByCategory,
  orderByDay,
  orderByDescription,
  orderByValue
}