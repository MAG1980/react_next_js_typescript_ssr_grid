const exampleTuple: [string, number, string] = ['first', 15, 'second']

exampleTuple.map(element => {
    switch (typeof element) {
        case 'string': {
            break
        }
        case 'number': {
            break
        }
    }
})

const [a1, b1, c2] = exampleTuple
const [d2, ...f] = exampleTuple