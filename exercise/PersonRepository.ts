import fs from "fs";
import path from "path";
import { Person } from "./Person";

export class PersonRepository {

    private readonly inputFile =
        path.join(__dirname, "people.json");

    private readonly outputFile =
        path.join(__dirname, "people.output.json");

    public loadPeople(): Person[] {

        try {

            if (!fs.existsSync(this.inputFile)) {
                throw new Error("people.json not found.");
            }

            const fileContent = fs.readFileSync(
                this.inputFile,
                "utf8"
            );

            const json = JSON.parse(fileContent);

            return json.map((item: any) =>
                Person.fromJSON(item)
            );

        } catch (error) {

            throw new Error(
                `Failed to load people: ${error}`
            );

        }
    }

    public savePeople(people: Person[]): void {

        try {

            const json = people.map(person =>
                person.toJSON()
            );

            fs.writeFileSync(
                this.outputFile,
                JSON.stringify(json, null, 4)
            );

        } catch (error) {

            throw new Error(
                `Failed to save people: ${error}`
            );

        }
    }

}