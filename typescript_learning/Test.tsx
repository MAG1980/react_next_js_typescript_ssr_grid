import React from "react";

//Обявление JSX-элемента
const a: JSX.Element = <div>Content</div>

//b идентично c
const b: JSX.Element = <div tabIndex={0}>{1 + 1}</div>
const c: JSX.Element = React.createElement('div', {tabIndex: 0}, 1 + 1)

//Каст типов в JSX
let a5: unknown
const b5 = a5 as string