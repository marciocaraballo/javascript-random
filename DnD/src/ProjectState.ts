import { ProjectStatus } from './types.js'
import { Project } from './Project.js'
import { State } from './State.js'

class ProjectState extends State<Project> {
    private projects: Project[] = []
    private static instance: ProjectState

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState()
        return this.instance
    }

    private updateListeners() {
        for (const listenerOf of this.listeners) {
            listenerOf(this.projects.slice())
        }
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            people,
            ProjectStatus.ACTIVE
        )

        this.projects.push(newProject)
        this.updateListeners()
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(
            (project) => project.id === projectId
        )

        if (project && project.status !== newStatus) {
            project.status = newStatus
            this.updateListeners()
        }
    }
}

export { ProjectState }
