type validAmount = number | "empty"

// структура данных склада с одеждой

interface ClothesWarehouse {
	jackets: validAmount;
	hats: validAmount;
	socks: validAmount;
	pants: validAmount;
}

// структура данных склада с канцтоварами

interface StationeryWarehouse {
	scissors: validAmount;
	paper: "empty" | boolean;
}

// структура данных склада с бытовой техникой

interface AppliancesWarehouse {
	dishwashers: validAmount;
	cookers: validAmount;
	mixers: validAmount;
}

// общая структура данных, наследует все данные из трех выше
// + добавляет свои

interface TotalWarehouse extends ClothesWarehouse, AppliancesWarehouse, StationeryWarehouse {
	deficit: boolean;
	date: Date;
}

// главный объект со всеми данными, должен подходить под формат TotalWarehouse

const totalData: TotalWarehouse = {
	jackets: 5,
	hats: "empty",
	socks: "empty",
	pants: 15,
	scissors: 15,
	paper: true,
	dishwashers: 3,
	cookers: "empty",
	mixers: 14,
	deficit: true,
	date: new Date()
};

// Реализуйте функцию, которая принимает в себя главный объект totalData нужного формата
// и возвращает всегда строку
// Функция должна отфильтровать данные из объекта и оставить только те названия товаров, у которых значение "empty"
// и поместить их в эту строку. Если таких товаров нет - возвращается другая строка (см ниже)

// С данным объектом totalData строка будет выглядеть:
// "We need this items: hats, socks, cookers"
// Товары через запятую, в конце её не должно быть. Пробел после двоеточия, в конце строки его нет.

function printReport(data: TotalWarehouse): string {
	let needed: string=''
	Object.entries(data).forEach(([key, value]) => {
		if (value === "empty") {
			needed += `${key} `
		}
	})
	if (needed) {
		return `We need this items: ${needed}`;
	}

	// или
	return "Everything fine";
}

console.log(printReport(totalData));
