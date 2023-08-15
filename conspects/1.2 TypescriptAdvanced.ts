/*
Встроенный дженерик-тип Readonly<T>
Alias for:{readonly [P in keyof T]: T[P]}
*/
type ReadonlyCurrencies = Readonly<Currencies>

let currence: ReadonlyCurrencies = {
    usa: 'usa',
    china: 'cny',
    kz: 'tenge'
}


//************************** Сопоставление типов: Mapped Types ***************************
/*Сопоставление типов (Mapped Types) позволяет создавать новые типы на основе базовых. При изменении базового типа
 типы, созданные путём сопоставления, автоматически получат соответствующие изменения.*/

/*Сопоставление типов (Mapped Types) в отличие от расширения (extends) позволяет не наследовать, а именно
 модифицировать (изменять) свойства типа */

/*На сопоставлении типов (Mapped Types) в TS основано большое количество манипуляций над типами*/

/*Сопоставление типов (Mapped Types) часто используется:
 при валидации данных, когда нужно сравнивать данные, полученные из формы, с эталонными
 при создании на общего интерфейса некоторого подвида, имеющего собственные свойства.
 */

//TS позволяет перебирать свойства типов.
/*Сопоставление типов работает только с типами, объявленными  с помощью ключевого слова type,
но перебирать можно и свойства интерфейсов*/

/*Создаёт тип данных (создать интерфейс невозможно, но можно использовать для создания типа),
содержащий свойства, входящие во Множество,
получающие указанный ПроизвольныйТипДанны
type СопоставимыйТип = {
    [произвольныйИдентификатор in Множество]:ПроизвольныйТипДанных
}
*/

//Простейший пример с литеральными типами, который не используется на практике
type Keys = 'name' | 'age' | 'role'
type User = {
    [K in Keys]: string
}
//Initial type: {name: string, age: string, role: string}

//Свойства типа Currencies относятся к литеральным типам
type Currencies = {
    usa: 'usa',
    china: 'cny',
    kz: 'tenge'
}

type CustomCurrenciesType = {
    [P in keyof Currencies]: string
}
//Initial type: {usa: string, china: string, kz: string

/////////////////////////////////////////////////////////////////////
//Создание свойств только для чтения

type CustomReadonlyCurrenciesType<T, S> = {
    readonly [P in keyof T]: S
}

let ex1: CustomReadonlyCurrenciesType<Currencies, number> = {
    usa: 1,
    kz: 2,
    china: 3
}

/////////////////////////////////////////////////////////////////////
//Создание необязательных (optional?) свойств
type CustomOptionalCurrenciesType<T, U> = {
    [P in keyof T]?: U
}

let ex2: CustomOptionalCurrenciesType<Currencies, number> = {
    usa: 1,
    // kz: 2,
    china: 3
}


/////////////////////////////////////////////////////////////////////
//Для добавления и удаления модификаторов используются символы "*" и "-"
//Создание необязательных (optional?) свойств
type CustomWithoutOptionalCurrenciesType<T, U> = {
    [P in keyof T]-?: U
}

let ex3: CustomWithoutOptionalCurrenciesType<Currencies, number> = {
    usa: 1,
    kz: 2, //При удалении одного из свойств из объекта возникнет ошибка, т.к.  все свойства снова стали обязательными
    china: 3
}

//Создаваемый тип содержит свойства типа T, имеющие те же типы, что и в типе T (T[P])
type CustomCurrenciesGenericType<T> = {
    [P in keyof T]: T[P]
}
let ex4: CustomCurrenciesGenericType<Currencies> = {
    usa: 'usa',
    china: 'cny',
    kz: 'tenge'
}


//************************** Template Literal Types ***************************
/*Механизм использования напоминает шаблонные строки в JS (backticks).
Template Literal Types работают только с типами, расширяющими string.
* Для работы с типами внутри Template Literal Types в TS имеются следующие дженерики:
* UpperCase, LowerCase, Capitalize, InCapitalize
* */

/////////////////////////////////////////////////////////////////////
type MyAnimationType = 'fade'
type MyNewAnimationType = `${MyAnimationType}In`
//Initial type: "fadeIn"

/////////////////////////////////////////////////////////////////////
type MyAnimationUnionType = 'fade' | 'swipe'
type MyNewAnimationUnionType = `${MyAnimationUnionType}In`
//Initial type: "fadeIn" | "swipeIn"

/////////////////////////////////////////////////////////////////////
type DirectionType = 'in' | 'out'
//Union type, включающий все возможные комбинации литеральных типов, входящих в шаблонную строку
type MyNewAnimationCompositeType = `${MyAnimationUnionType}${DirectionType}`
//Initial type: "fadein" | "fadeout" | "swipein" | "swipeout

/////////////////////////////////////////////////////////////////////
//Union type, использующий дженерик Capitalize, для преобразования второй половины значения к верхнему регистру
type MyNewAnimationGenericCompositeType = `${MyAnimationUnionType}${Capitalize<DirectionType>}`
//Initial type: "fadeIn" | "fadeOut" | "swipeIn" | "swipeOut"

/////////////////////////////////////////////////////////////////////
//Комбинирование Mapped и Template Literal Types позволяет модифицировать ключи результирующего типа
type CustomCurrenciesMappedLiteralType<T> = {
    [P in keyof T as `custom${Capitalize<string & P>}`]: string
}
//Intersection (пересечение) string & P позволяет убедить TS, что P является строкой

/*Объект должен иметь свойства, полученные с помощью шаблонной строки из названий свойств типа Currencies,
и относящиеся к типу данных string*/
let ex5: CustomCurrenciesMappedLiteralType<Currencies> = {
    customChina: 'adf',
    customKz: 'df',
    customUsa: 'ads'
}

//************************** Utility Types ***************************
//Встроенные в TS типы, которые позволяют производить манипуляции с другими типами.
//Например, Readonly, Partial, Required.

/////////////////////////////////////////////////////////////////////
/*
Omit - позволяет исключить какие-либо свойства из другого типа
Alias for: Pick<T, Exclude<keyof T, K>>
Initial type: {[P in keyof T extends K ? never : keyof T]: T[P]}
*/

//В результирующем типе отсутствует свойство с названием 'usa'
type CurrencyWithoutUSA = Omit<Currencies, 'usa'>
//Initial type: {china: "cny", kz: "tenge"}

/////////////////////////////////////////////////////////////////////
/*
Pick - позволяет формировать тип путём получения из базового типа указанных свойств (фильтрации).
Alias for:{[P in K]: T[P]}
Expanded:{[p: string]: T[string]}
*/

//В результирующий тип попадут только перечисленные свойства ('usa'|'kz'):
type CurrencyUSAAndKzType = Pick<Currencies, 'usa' | 'kz'>
//Initial type: {usa: "usa", kz: "tenge"}

/////////////////////////////////////////////////////////////////////
/*
Exclude - позволяет исключать из базового Union-типа значения, которые соответствуют условию (фильтрация).
Alias for:T extends U ? never : T
Expanded: T
*/

//Из базового типа будет исключено свойство 'swipe':
type FadeType = Exclude<MyAnimationType, 'swipe'>
//Initial type: "fade"

/*Из базового типа с помощью keyof формируем юнион-тип, состоящий из названий свойств базового типа.
Из полученного юнион-типа исключаем значение 'usa'|'china'
*/

type CurrenciesWithoutUSAAndChinaType = Exclude<keyof Currencies, 'usa' | 'china'>
//Initial type: "kz

/////////////////////////////////////////////////////////////////////
/*
Extract - (действие, обратное Exclude) выбирает (возвращает) типы, которые соответствуют условию (фильтрация).
Выбор подходящего типа. В качестве первого параметра может принимать union-type.
Alias for: T extends U ? T : never
Expanded: T & U
*/

type SwipeType = Extract<MyAnimationUnionType | DirectionType, 'swipe' | 'fade' | 'in'>
//Initial type: "fade" | "swipe" | "in"

/////////////////////////////////////////////////////////////////////
/*
Record - позволяет сконструировать другой тип в формате "ключ-значение".
Первый параметр дженерика - свойства нового типа, второй - значения
Construct a type with a set of properties K of type T
Alias for: {[P in K]: T}
Expanded: {[p: string]: T
*/

type PlayersNamesType = 'alex' | 'john'
type GameDataCurrency = Record<PlayersNamesType, CustomCurrenciesType>
//Initial type: {alex: CustomCurrenciesType, john: CustomCurrenciesType}
const GameData: GameDataCurrency = {
    alex: {
        usa: 'adsf',
        china: 'dfd',
        kz: 'df'
    },
    john:{
        usa: '2adsf',
        china: '3dfd',
        kz: '4df'
    }
}

/*
Использование типов, взаимно зависящих друг от друга,
позволяет избежать дублирования,
а также даёт возможность TS автоматически формировать ошибки при внесении изменений в базовый тип
и отсутствии корректировок зависимых типов.
*/
