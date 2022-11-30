// @param {Todo} todos   --> (../models/todo.model)

export const createTodo = ( todo ) => {
    if(!todo) throw new Error('A Todo Object is required');
    const { done, id, description } = todo;
    const todoHtml = `
        <div class="view">
            <input class="toggle" type="checkbox"
            ${done ? 'checked' : '' }>
            <label>${ description }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit">
    `;
    const liElement = document.createElement('li');
    liElement.setAttribute('data-id', id );
    if(todo.done) liElement.classList.add('completed');

    liElement.innerHTML = todoHtml;
    return liElement;
}