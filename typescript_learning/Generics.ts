function logTime1(time: number): number {
    console.log(new Date())
    return time
}

function logTime2(time: string): string {
    console.log(new Date())
    return time
}

/*Generics позволяют использовать функции и объекты для разных типов данных.
В данном случае использован generic-type <T>,
который позволяет использовать одну функцию logTimeGeneric для Number и String*/
function logTimeGeneric<T>(time: T): T {
    console.log(new Date())
    return time
}

//Пример использования функции с generic-type
logTimeGeneric<number>(123)
logTimeGeneric<string>('123')


//После проверки типа аргумента IDE будет прелагать для него только доступные методы
function logTimeGenericSwitch<T>(time: T): T {
    switch (typeof time) {
        case 'string': {
            time.toUpperCase()
            break
        }
        case 'number': {
            time.toLocaleString()
            break
        }
    }
    return time
}


//Generics можно использовать и при объявлении интерфейсов.
interface IMyInterface {
    transform: (a: number) => number
}

//При различных типах входного и выходного значения
interface IMyInterfaceGeneric {
    transform: <T,U>(a: T) => U
}

//Использование Generics в классах
/*По умолчанию в Typescript включена строгая проверка класса,
 где все свойства должны быть инициализированы в конструкторе.
 Обходным путем является добавление ! в качестве постфикса к имени переменной.*/
class MyClass<T>{
     value!:T
}

const ClassA=new MyClass<number>()
console.log(ClassA.value)//type is number


interface MyInterface2{
    name:string
}

/*С помощью указания,
что дженерик <T> расширяет (extends) MyInterface2
удаётся обязать дженерик иметь внутри свойства,
 описанные интерфейсом MyInterface2.*/
function logName<T extends MyInterface2>(obj:T):T{
    console.log(obj.name)
    return obj
}