interface IUserData {
	readings: number,
	units: "kWt"|"m3",
	mode?: "single"|"double",
}

interface ICalculatePayments{
	elData:IUserData['readings'],
	wData:IUserData['readings'],
	elRate: typeof elRate,
	wRate: typeof wRate
}

type Rate = number

type monthPayments = [number, number]

const electricityUserData: IUserData = {
	readings: 95,
	units: "kWt",
	mode: "double",
};

const waterUserData: IUserData = {
	readings: 3,
	units: "m3",
};

const elRate: Rate = 0.45;
const wRate: Rate = 2;

const monthPayments:monthPayments = [0, 0]; // [electricity, water]

const calculatePayments = (elData:IUserData, wData:IUserData, elRate:Rate, wRate:Rate) => {
	if (elData.mode === "double" && elData.readings < 50) {
		monthPayments[0] = elData.readings * elRate * 0.7;
	} else {
		monthPayments[0] = elData.readings * elRate;
	}

	monthPayments[1] = wData.readings * wRate;
};

calculatePayments(electricityUserData, waterUserData, elRate, wRate);

const sendInvoice = (monthPayments:monthPayments, electricityUserData:IUserData, waterUserData:IUserData):string => {
	const text = `    Hello!
    This month you used ${electricityUserData.readings} ${electricityUserData.units} of electricity
    It will cost: ${monthPayments[0]}€
    
    This month you used ${waterUserData.readings} ${waterUserData.units} of water
    It will cost: ${monthPayments[1]}€`;

	return text;
};

console.log(sendInvoice(monthPayments, electricityUserData,waterUserData))