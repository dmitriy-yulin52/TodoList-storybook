import {
    AddTaskAC,
    RemoveTaskAC, setTasksAC,
    taskReducer,
    TasksStateType, updateTaskAC
} from "../state/task-reducer";
import {addTodoListAC, removeTodoListAC, setTodolistsAC} from "../state/todoList-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todoList-api";


let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        'todoListId1': [
            {
                id: '1',
                title: 'What to learn',
                addedDate: '20:21',
                order: 1,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                description: ''
            },
            {
                id: '2', title: 'React', addedDate: '20:21', order: 1,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                description: ''
            },
            {
                id: '1', title: 'Css', addedDate: '20:21', order: 1,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                description: ''
            },
        ],
        'todoListId2': [
            {
                id: '1', title: 'Css', addedDate: '20:21', order: 1,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                description: ''
            },
            {
                id: '2', title: 'HTML', addedDate: '20:21', order: 1,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                description: ''
            },
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
test('correct task should be added to correct array', () => {

    const action = AddTaskAC(
        {
            id: 'id ex',
            title: 'Hello!',
            addedDate: '20:22',
            order: 0,
            status: TaskStatuses.New,
            priority: 0,
            startDate: '',
            deadline: '',
            todoListId: 'todolistId3',
            description: ''
        }
    )
    const endState = taskReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(2)
    expect(endState['todoListId2'].length).toBe(3)
    expect(endState['todoListId2'][0].id).toBeDefined()
    expect(endState['todoListId2'][0].title).toBe('Hello!')
    expect(endState['todoListId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {

    const modal= {
        title: '',
        description: '',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Later,
        startDate: '',
        deadline: ''
    }
    const action = updateTaskAC('1', modal, 'todoList_1')
    const endState = taskReducer(startState, action)

    expect(endState['todoList_1'][0].status).toBe(TaskStatuses.Completed)
    expect(endState['todoList_2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todoList_2'][1].title).toBe('HTML')

})
test('title of specified task should be changed', () => {

    const modal= {
        title: 'c++',
        description: '',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Later,
        startDate: '',
        deadline: ''
    }
    const action = updateTaskAC('2', modal, 'todoList_2')
    const endState = taskReducer(startState, action)

    expect(endState['todoList_2'][0].title).toBe('Css')
    expect(endState['todoList_2'][1].title).toBe('c++')

})
test('new array should be added when new todolist is added', () => {


    const toDo = {
        id: '1',
        title: 'Hello world!',
        addedDate: '',
        order: 4,
    }
    const action = addTodoListAC(toDo)
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find((k) => {
        return k != 'todoList_1' && k != 'todoList_2'
    })
    if (!newKey) {
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
test('empty arrays should be added when we set todoLists', () => {
    const action = setTodolistsAC([
        {id: '1', title: 'What to learn', addedDate: '20:21', order: 3},
        {id: '2', title: 'What to learn', addedDate: '20:21', order: 3}
    ])
    const endState = taskReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
    expect(endState['2']).toStrictEqual([])
})
test('task should be added for todoList', () => {


    const action = setTasksAC(startState['todoList_1'], 'todoList_1')

    const endState = taskReducer({
        'todoList_2': [],
        'todoList_1': [
            {
                id: '4', title: 'Css', addedDate: '20:21', order: 1,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                description: ''
            },
        ],
    }, action)

    expect(endState['todoList_1'].length).toBe(3)
    expect(endState['todoList_2'].length).toBe(0)

})