import {taskReducer, TasksStateType} from "../state/task-reducer";
import {addTodoListAC, TodoListDomainType, todoListReducer, TodoListType} from "../state/todoList-reducer";


test('id should be equals',()=>{

    const startTaskState:TasksStateType = {}
    const startTodoListState:Array<TodoListDomainType> = []

    const action = addTodoListAC({
        id: '1',
        title: 'hello',
        addedDate: '',
        order: 5
    })

    const endTaskState = taskReducer(startTaskState,action)
    const endTodoListState = todoListReducer(startTodoListState,action)

    const keys = Object.keys(endTaskState)

    const idFromTask = keys[0]
    const idFromTodoList = endTodoListState[0].id

    expect(idFromTask === idFromTodoList).toBe(true)

})