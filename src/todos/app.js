import html from './app.html?raw' // ?raw -> para poder importar el archivo html
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos, renderPending } from '../use-cases';

const ElementsIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filter',
    PendingCount: '#pending-count',
}

//@param {String} elementId
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos( ElementsIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending( ElementsIDs.PendingCount);
    }

    // self-invoking anonymous function - create the todos in the html
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // html references
    const newDescriptionInput = document.querySelector( ElementsIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementsIDs.TodoList );
    const clearCompletedBtn = document.querySelector( ElementsIDs.ClearCompleted);
    const todoFilters = document.querySelectorAll( ElementsIDs.TodoFilters)


    // listeners
    newDescriptionInput.addEventListener('keyup', (ev) =>{
        // console.log(ev.target.value);
        // validations:
        if( ev.keyCode !== 13 ) return;   // press any key other than enter
        if( ev.target.value.trim().length === 0 ) return;

        todoStore.addTodo( ev.target.value );
        displayTodos();

    })

    todoListUL.addEventListener('click', (ev) => {
        // console.log(ev.target);
        const element = ev.target.closest('[data-id]');
        // console.log(element);
        todoStore.toggleTodo( element.getAttribute('data-id'));
        displayTodos();

    })

    todoListUL.addEventListener('click', (ev) => {
        const isDestroy = ev.target.className === 'destroy';  // true or false
        const element = ev.target.closest('[data-id]');
        if( !element || !isDestroy ) return;

        todoStore.deleteTodo( element.getAttribute('data-id'));
        displayTodos();

    })

    clearCompletedBtn.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    })

    todoFilters.forEach( element => {
        element.addEventListener('click', ( element ) => {
            todoFilters.forEach( el => el.classList.remove('selected'));
            element.target.classList.add('selected');
            //console.log( filter.target.text );
            switch( element.target.text ){
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                break;
            }

            displayTodos();
        })
    })


}