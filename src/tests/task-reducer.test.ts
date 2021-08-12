import {
    AddTaskAC,
    AddTaskTitleAC,
    changeTaskStatusAC,
    RemoveTaskAC,
    taskReducer,
    TasksStateType
} from "../state/task-reducer";


let startState : TasksStateType


beforeEach(()=> {
    startState = {
        'todoList_1':[
            {id: '1',  title: 'React',isDone: true},
            {id: '2',  title: 'Js',isDone: false},
            {id: '3',  title: 'Redux',isDone: true},
            {id: '4',  title: 'MobX',isDone: false},
        ],
        'todoList_2':[
            {id: '1',  title: 'Milk',isDone: false},
            {id: '2',  title: 'Football',isDone: true},
            {id: '3',  title: 'Programming',isDone: false},
            {id: '4',  title: 'Lite',isDone: true},
        ]
    }
})


test('correct should be deleted from correct array',()=>{

    const action = RemoveTaskAC('2','todoList_2')

    const endState = taskReducer(startState,action)


    expect(endState).toEqual({
        'todoList_1':[
            {id: '1',  title: 'React',isDone: true},
            {id: '2',  title: 'Js',isDone: false},
            {id: '3',  title: 'Redux',isDone: true},
            {id: '4',  title: 'MobX',isDone: false},
        ],
        'todoList_2':[
            {id: '1',  title: 'Milk',isDone: false},
            {id: '3',  title: 'Programming',isDone: false},
            {id: '4',  title: 'Lite',isDone: true},
        ]
    })
})
test('correct should be added to correct array',()=>{

    const action = AddTaskAC('Hello world!','todoList_1')
    const endState = taskReducer(startState,action)

    expect(endState['todoList_1'].length).toBe(5)
    expect(endState['todoList_2'].length).toBe(4)
    expect(endState['todoList_1'][0].id).toBeDefined()
    expect(endState['todoList_1'][0].title).toBe('Hello world!')
    expect(endState['todoList_1'][0].isDone).toBe(false)
})
test('status of specified task should be changed',()=>{

    const action = changeTaskStatusAC('1',true,'todoList_1')
    const endState = taskReducer(startState,action)

    expect(endState['todoList_1'][0].isDone).toBe(true)
    expect(endState['todoList_2'][1].isDone).toBe(true)
    expect(endState['todoList_2'][2].isDone).toBe(false)

})
test('title of specified task should be changed',()=>{

    const action = AddTaskTitleAC('3','Hello world!','todoList_2')
    const endState = taskReducer(startState,action)

    expect(endState['todoList_1'][0].title).toBe('React')
    expect(endState['todoList_2'][2].title).toBe('Hello world!')
    expect(endState['todoList_2'][1].title).toBe('Football')

})