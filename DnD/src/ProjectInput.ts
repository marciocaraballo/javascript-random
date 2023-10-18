import { Validatable } from './types.js'
import { validate } from './validate.js'
import { autobind } from './autobind.js'
import { ProjectState } from './ProjectState.js'
import { Component } from './Component.js'

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement
    projectState: ProjectState

    constructor(projectState: ProjectState) {
        super('project-input', 'app', true, 'user-input')

        this.projectState = projectState

        this.titleInputElement = this.element.querySelector(
            '#title'
        ) as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector(
            '#description'
        ) as HTMLInputElement
        this.peopleInputElement = this.element.querySelector(
            '#people'
        ) as HTMLInputElement

        this.configure()
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value
        const enteredDescription = this.descriptionInputElement.value
        const enteredPeople = this.peopleInputElement.value

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
        }

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLenght: 5,
        }

        const peopleValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            min: 1,
        }

        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again')
            return
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople]
        }
    }

    private clearInputs() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault()
        const userInput = this.gatherUserInput()

        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput

            this.projectState.addProject(title, desc, people)
            this.clearInputs()
        }
    }

    renderContent(): void {}

    configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }
}

export { ProjectInput }
