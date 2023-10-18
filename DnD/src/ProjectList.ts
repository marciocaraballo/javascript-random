import { Project } from './Project.js'
import { DragTarget, ProjectStatus } from './types.js'
import { ProjectState } from './ProjectState.js'
import { Component } from './Component.js'
import { ProjectItem } from './ProjectItem.js'
import { autobind } from './autobind.js'

class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
{
    assignedProjects: Project[] = []

    constructor(
        private projectState: ProjectState,
        private type: 'active' | 'finished'
    ) {
        super('project-list', 'app', false, `${type}-projects`)

        this.configure()
        this.renderContent()
    }

    @autobind
    dragOverHandler(event: DragEvent): void {
        if (
            event.dataTransfer &&
            event.dataTransfer.types[0] === 'text/plain'
        ) {
            event.preventDefault()
            const listEl = this.element.querySelector('ul')!
            listEl.classList.add('droppable')
        }
    }

    @autobind
    dropHandler(event: DragEvent): void {
        const projId = event.dataTransfer!.getData('text/plain')
        this.projectState.moveProject(
            projId,
            this.type === 'active'
                ? ProjectStatus.ACTIVE
                : ProjectStatus.FINISHED
        )
    }

    @autobind
    dragLeaveHandler(_: DragEvent): void {
        const listEl = this.element.querySelector('ul')!
        listEl.classList.remove('droppable')
    }

    private renderProjects() {
        const listEl = document.getElementById(
            `${this.type}-projects-list`
        )! as HTMLUListElement
        listEl.innerHTML = ''
        for (const proj of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, proj)
        }
    }

    configure(): void {
        this.element.addEventListener('dragover', this.dragOverHandler)
        this.element.addEventListener('dragleave', this.dragLeaveHandler)
        this.element.addEventListener('drop', this.dropHandler)
        this.projectState.addListener((projectList: Project[]) => {
            const matchedProjects = projectList.filter((prj) => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.ACTIVE
                }
                return prj.status === ProjectStatus.FINISHED
            })
            this.assignedProjects = matchedProjects

            this.renderProjects()
        })
    }

    renderContent() {
        const listId = `${this.type}-projects-list`
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent =
            this.type.toUpperCase() + ' PROJECTS'
    }
}

export { ProjectList }
