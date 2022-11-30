import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

// All todos
const state = {
    todos: [
        // new Todo('Tarea 1'),
        // new Todo('Tarea 2'),
        // new Todo('Tarea 3'),
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
    console.log('InitStore 💎');
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;
    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
    
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = ( filter = Filters.All ) => {
    switch( filter ) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return [...state.todos.filter( todo => todo.done )];
        case Filters.Pending:
            return [...state.todos.filter( todo => !todo.done )];  // todo.done === false
        default:
            throw new Error(`Option ${filter} is not valid`);
    }
}

// @param {String} description
const addTodo = ( description ) => {
    if ( !description ) throw new Error('Not implemented');
    state.todos.push( new Todo(description));
    saveStateToLocalStorage();
}

// @param {String} todoId
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ) {
            todo.done = !todo.done;   //opposite value (false-true)
        }
        return todo;
    })
    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

// Delete All Completed Todos
const deleteCompleted = ( ) => {
    state.todos = state.todos.filter( todo => !todo.done);
    saveStateToLocalStorage();
}

// Know which filter is selected
// @param {Filters} newFilter
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}