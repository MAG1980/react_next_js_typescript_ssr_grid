let c = 'test' //string

//Теперь переменная literal  может принимать только значение 'test1'
let literal: 'test1' = 'test1'

/*
Для литерального actionType допустимы только значения 'up'|'down'.
Это поведение напоминает тип Enum
*/
type actionType = 'up' | 'down'

/*
Возвращаемое функцией значение можно типизировать конкретными литералами,
например 1 | -1
*/
function performAction(action: actionType): 1 | -1 {
    switch (action) {
        //При нажатии alt+Enter в кавычках Storm предлагает допустимые для типа значения
        case 'up': {
            return 1
        }
        case 'down': {
            return -1
        }
    }
}

/*
Литеральные типы можно комбинировать с обычными типами и интерфейсами
*/
interface IAction{
    s:string
}

function exampleFunction(action:actionType|IAction){
    return
}