type animal = 'cat' | 'dog' | 'bird'

enum Status {
    available = 'available',
    notAvailable = 'not available'
}

interface IRequestAnimal {
    animal: animal,
    breed: string,
    sterilized?: string
}

//Следую принципу DRY
interface IResponseAnimal extends IRequestAnimal {
    location: string,
    age?: number
}

interface IResponseError {
    status: Status.available,
    data: {
        message: string,
        nextUpdateIn: Date
    }
}

interface IResponseSuccess {
    status: Status.available,
    data: IResponseAnimal
}

type response = IResponseSuccess | IResponseError

// Request
// {
//     animal: 'cat' | 'dog' | 'bird',
//     breed: string,
//     sterilized?: string
// }

// Response #1

// {
//     status: 'available',
//     data: {
//         animal: 'cat' | 'dog' | 'bird',
//         breed: string,
//         sterilized?: string,
//         location: string,
//         age?: number
//     }
// }

// Response #2

// {
//     status: 'not available',
//     data: {
//         message: string,
//         nextUpdateIn: Date
//     }
// }

function isSuccess(response: response): response is IResponseSuccess {
    return response.status === Status.available
}

function checkAnimalData(animal: response): IResponseAnimal | string {
    /*    if ("available") {
            // Заменить условие!
            return animal.data;
        } else {
            return `${animal.data}, you can try in ${animal.data.nextUpdateIn}`;
        }*/
    if (isSuccess(animal)) {
        return animal.data
    } else {
        return `${animal.data}, you can try in ${animal.data.nextUpdateIn}`;
    }
}
