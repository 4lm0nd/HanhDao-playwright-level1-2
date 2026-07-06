import { PersonRepository } from "./PersonRepository";

const repository = new PersonRepository();

try {

    const people = repository.loadPeople();

    people.forEach(person => {

        person.celebrateBirthday();

        console.log(person.greet());

        console.log(
            `Adult: ${person.isAdult()}`
        );

        console.log("----------------");

    });

    repository.savePeople(people);

    console.log("Saved successfully.");

} catch (error) {

      throw error;

}