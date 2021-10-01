const imgs = document.querySelectorAll('.gallery img');
const body = document.querySelector('body');
const menuButton = document.querySelector('.aside__menu img');
const asideTexts = document.querySelectorAll('.aside p');

menuButton.addEventListener('click', ()=> {
  asideTexts.forEach( text => text.classList.toggle('none') )
})

imgs.forEach((img)=> { 
})

imgs.forEach((img, index)=> { 
  img.addEventListener('click', () => { 
    
    let indexAtual = index;
    const {modal, imgModal, arrowLeft, arrowRight} = createModal(img.src, indexAtual);
    
    body.append(modal);

    img.addEventListener('dblclick', ()=> {
      const like = document.createElement('img'); 
      like.src = 'assets/like.svg'
      img.append(like);
      //like.classList.add('like');
      //text.classList.toggle('none')
    })
    modal.addEventListener('click', ()=> { 
      modal.remove();
    })
    
    imgModal.addEventListener('click', (event)=> { 
      event.stopPropagation();
    })
    
    arrowLeft.addEventListener('click', previousPicture);
    document.addEventListener('keydown', previousPicture);
    
    arrowRight.addEventListener('click', nextPicture); 
    document.addEventListener('keydown', nextPicture);
    
    function previousPicture(event) { 
      if (event.code === 'ArrowLeft'|| event.type === 'click') {
        console.log(event)
        
        indexAtual = indexAtual === 0 ? imgs.length-1 : indexAtual-1; 
        imgModal.src = imgs[indexAtual].src;
        
        event.stopPropagation();
      } else { 
        return;
      }
    }
    
    function nextPicture(event) { 
      if (event.code === 'ArrowRight' || event.type === 'click') {
        console.log(event)
        
        indexAtual = (indexAtual+1 < imgs.length) ? indexAtual+1 : 0; 
        imgModal.src = imgs[indexAtual].src;
        
        event.stopPropagation();
      } else { 
        return;
      }
    }
  })
})


function createModal(src, indexAtual) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  
  const imgModal = document.createElement('img');
  imgModal.src = src;
  
  const arrowLeft = document.createElement('img');
  arrowLeft.src = './assets/prev.svg'
  
  const arrowRight = document.createElement('img');
  arrowRight.src = './assets/next.svg'
  
  modal.append(arrowLeft, imgModal, arrowRight);
  
  return {modal, imgModal, arrowLeft, arrowRight};
}