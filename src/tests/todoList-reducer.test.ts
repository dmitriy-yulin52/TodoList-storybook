import {v1} from "uuid";
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC, TODOLIST_ACTION_TYPE,
    todoListReducer,
    TitleType, setTodolistsAC, TodoListDomainType
} from "../state/todoList-reducer";

let todoList_1: string
let todoList_2: string
let startState: Array<TodoListDomainType> = []

beforeEach(() => {
    todoList_1 = v1()
    todoList_2 = v1()

    startState = [
        {id: todoList_1, title: 'What to learn', filter: 'All',addedDate:'20:21',order:3},
        {id: todoList_2, title: 'What to buy', filter: 'All',addedDate:'20:21',order:3}
    ]
})

test('correct todolist should be removed', () => {

    const action = removeTodoListAC(todoList_1)
    const endState = todoListReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoList_2)
    expect(endState[0].title).toBe('What to buy')

})
test('correct todolist should be added', () => {


    const action = addTodoListAC(
        {id: todoList_1,
            title: 'Hello world!',
            addedDate:'20:21',
            order:3
        })
    const endState = todoListReducer(startState, action)


    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Hello world!')
    expect(endState[0].addedDate).toBe('20:21')
    expect(endState[1].addedDate).toBe('What to learn')


})
test('correct todolist should change its name', () => {

    const action = changeTodoListTitleAC('Hello world!!!!', todoList_2)
    const endState = todoListReducer(startState, action)


    expect(endState.length).toBe(2)
    expect(endState[1].id).toBe(todoList_2)
    expect(endState[1].title).toBe('Hello world!!!!')

})
test('correct filter of todolist should be changed', () => {

    const filter: TitleType = "Completed"

    const action = {
        type: TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_FILTER,
        title: filter,
        todoListId: todoList_1
    }

    const endState = todoListReducer(startState, changeTodoListFilterAC(action.title, action.todoListId))

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe("All")
    expect(endState[1].id).toBe(todoList_2)
    expect(endState[0].filter).toBe(filter)


})
test('todoLists should be to the state', () => {


    const action = setTodolistsAC(startState)
    const endState = todoListReducer([], action)

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe("All")
    expect(endState[1].id).toBe(todoList_2)
    expect(endState[0].id).toBe(todoList_1)


})
