import {
    AddTaskAC,
    RemoveTaskAC,
    taskReducer,
    TasksStateType
} from "../state/task-reducer";
import {addTodoListAC, removeTodoListAC, setTodolistsAC, todoListReducer} from "../state/todoList-reducer";
import {TodoListTypeRes} from "../api/todoList-api";


let startState: TodoListTypeRes

beforeEach(() => {
    startState = {
        'todoList_1': [
            {id: '1', title: 'What to learn',addedDate:'20:21',order:1},
            {id: '2', title: 'Js', addedDate:'20:21',order:2},
            {id: '3', title: 'Redux', addedDate:'20:21',order:3},
            {id: '4', title: 'MobX', addedDate:'20:21',order:4},
        ],
        'todoList_2': [
            {id: '1', title: 'Milk', addedDate:'20:21',order:3},
            {id: '2', title: 'Football', addedDate:'20:21',order:3},
            {id: '3', title: 'Programming', addedDate:'20:21',order:3},
            {id: '4', title: 'Lite', addedDate:'20:21',order:3},
        ]
    }
})


test('correct should be deleted from correct array', () => {

    const action = RemoveTaskAC('2', 'todoList_2')

    const endState = taskReducer(startState, action)


    expect(endState).toEqual({
        'todoList_1': [
            {id: '1', title: 'React', isDone: true},
            {id: '2', title: 'Js', isDone: false},
            {id: '3', title: 'Redux', isDone: true},
            {id: '4', title: 'MobX', isDone: false},
        ],
        'todoList_2': [
            {id: '1', title: 'Milk', isDone: false},
            {id: '3', title: 'Programming', isDone: false},
            {id: '4', title: 'Lite', isDone: true},
        ]
    })
})
test('correct should be added to correct array', () => {

    const action = AddTaskAC('Hello world!', 'todoList_1')
    const endState = taskReducer(startState, action)

    expect(endState['todoList_1'].length).toBe(5)
    expect(endState['todoList_2'].length).toBe(4)
    expect(endState['todoList_1'][0].id).toBeDefined()
    expect(endState['todoList_1'][0].title).toBe('Hello world!')
    expect(endState['todoList_1'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('1', true, 'todoList_1')
    const endState = taskReducer(startState, action)

    expect(endState['todoList_1'][0].isDone).toBe(true)
    expect(endState['todoList_2'][1].isDone).toBe(true)
    expect(endState['todoList_2'][2].isDone).toBe(false)

})
test('title of specified task should be changed', () => {

    const action = AddTaskTitleAC('3', 'Hello world!', 'todoList_2')
    const endState = taskReducer(startState, action)

    expect(endState['todoList_1'][0].title).toBe('React')
    expect(endState['todoList_2'][2].title).toBe('Hello world!')
    expect(endState['todoList_2'][1].title).toBe('Football')

})
test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC('Hello world!')
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find((k) => {
        return k != 'todoList_1' && k != 'todoList_2'
    })
    if(!newKey){
        throw Error('new key should be added')
    }


    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})
test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC('todoList_2')
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoList_2']).not.toBeDefined()

})
test('empty arrays should be added when we set todoLists', ()=> {
    const action = setTodolistsAC([
        {id: '1', title: 'What to learn',addedDate:'20:21',order:3},
        {id: '2', title: 'What to learn',addedDate:'20:21',order:3}
    ])
    const endState = taskReducer({},action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
    expect(endState['2']).toStrictEqual([])
})