import { createTodo } from "./create-todo";

let element;
/*
@param {String} elementId
@param {Todo} todos --> (../models/todo.model)
*/
// this function will generate the Todos
export const renderTodos = ( elementId, todos = [] ) => {
    console.log( elementId, todos);

    // if the element does not exist
    if (!element)
        element = document.querySelector( elementId );
    
    // if the element does not exist after doing this assignment --> Error
    if (!element) throw new Error(`Element ${elementId} not found`);

    element.innerHTML = '';

    todos.forEach( todo => {
        element.append( createTodo( todo ) );
    });
}