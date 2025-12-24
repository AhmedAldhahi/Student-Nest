export default function exercise(){
    type Car = {
        brand: string;
        year: number;
        isElectric: boolean
    }
    const updateCar1 =(key: string, value: any) =>{
        console.log("Updating: ", key , value);
    };

    const updateCar2 = (key: keyof Car, value: any) =>{
        console.log("Updating: ", key , value);
    }

    const updateCar3 = <K extends keyof Car>(key: K, value: Car[K])=>{
        console.log("Updating: ", key , value);
    }
}