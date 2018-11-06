const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);


    const check = items.querySelectorAll('.item__checkbox');
    const del = items.querySelectorAll('.item__button');
    const txt = items.querySelectorAll('.item__text');  


    for(let i=0; i < check.length; i++) {
      del[i].addEventListener('click', deleteItem);
      check[i].addEventListener('click', finish);
      txt[i].addEventListener('click', edit);
    }

  }

  function formHandler(e) {
    e.preventDefault();
    const inp = this.querySelector('.form__input').value;
    add(inp);
    
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    this.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    let newin = el('input', 'item__edit');
    newin.setAttribute('type', 'text');
    newin.value += this.innerText;
    this.replaceWith(newin);
    newin.focus();

    //commit
    newin.addEventListener('keyup', commit);

  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if(e.keyCode === ENTER_KEYCODE) {

      const spancommit = el('span', 'item__text', edit);
      spancommit.appendChild(document.createTextNode(this.value));
      this.replaceWith(spancommit);
      
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    //parent
    const li = el('li', 'item');

    //children
    const input = el('input', 'item__checkbox', finish);
    input.setAttribute('type', 'checkbox');

    const span = el('span', 'item__text',edit);
    span.appendChild(document.createTextNode(value));

    const button = el('button', 'item__button', deleteItem);
    button.appendChild(document.createTextNode('Eyða'));


    li.appendChild(input)
    li.appendChild(span)
    li.appendChild(button)

    items.appendChild(li);

    document.querySelector('.form__input').value = '';
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    this.parentNode.remove();
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const el = document.createElement(type);
    el.setAttribute('class', className);
    if(clickHandler != undefined){
      el.addEventListener('click', clickHandler);
    }
    return el;
  }

  return {
    init: init
  }
})();
