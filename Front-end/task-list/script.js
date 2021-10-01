const body = document.querySelector('body');
const list = document.querySelector('.task__list');
const input = document.querySelector('.task__input');

input.addEventListener('keydown', (event) => {
  if (event.code !== 'Enter' || !input.value) {
    return;
  }
  const task__text = input.value;

  const box = document.createElement('div');
  box.classList.add('task__box', 'flex-row');
  
  const close_button = document.createElement('button');
  close_button.textContent = "X";

  const task = document.createElement('li');
  task.classList.add('task__list');
  
  task.textContent = task__text;
  if (input.value.length > 15) { 
    task.classList.add('text-overflow');

    const show_more = document.createElement('span');
    show_more.textContent = 'Mostrar mais';
    show_more.classList.add('task__show_more');
    
    box.append(task, show_more, close_button);
  
    show_more.addEventListener('click', (event)=> {
      event.stopPropagation();
      
      box.style.width= box.style.width !== 'fit-content'?'fit-content':'150px';
      show_more.textContent = show_more.textContent ==='Mostrar mais' ? 'Mostrar menos' : 'Mostrar mais'; 
    })
    
  } else { 
    box.append(task, close_button);
  }
  
  body.append(box);
  
  close_button.addEventListener('click', () => { 
    box.remove();
  });
  
  
  box.addEventListener('click', ()=> { 
    task.classList.toggle('task-done')
    box.classList.toggle('box-done')
  })
  
  input.value = '';
})

