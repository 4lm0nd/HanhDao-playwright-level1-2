export class Person {
    private name: string;
    private age: number;
    private city: string;

    constructor(name: string, age: number, city: string) {
        if (!name.trim()) {
            throw new Error("Name cannot be empty.");
        }

        if (age <= 0) {
            throw new Error("Age must be positive.");
        }

        this.name = name;
        this.age = age;
        this.city = city;
    }

    public greet(): string {
        return `Hi, I'm ${this.name} from ${this.city}.`;
    }

    public celebrateBirthday(): void {
        this.age++;
    }

    public updateCity(newCity: string): void {
        this.city = newCity;
    }

    public isAdult(): boolean {
        return this.age >= 18;
    }

    public hasSameCity(other: Person): boolean {
        return this.city === other.city;
    }

    public getName(): string {
        return this.name;
    }

    public getAge(): number {
        return this.age;
    }

    public getCity(): string {
        return this.city;
    }

    public toJSON() {
        return {
            name: this.name,
            age: this.age,
            city: this.city
        };
    }

    public static fromJSON(data: any): Person {
        return new Person(
            data.name,
            data.age,
            data.city
        );
    }
}