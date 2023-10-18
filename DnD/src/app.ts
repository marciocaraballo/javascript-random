import { ProjectState } from './ProjectState.js'
import { ProjectList } from './ProjectList.js'
import { ProjectInput } from './ProjectInput.js'

const projectState = ProjectState.getInstance()

new ProjectInput(projectState)
new ProjectList(projectState, 'active')
new ProjectList(projectState, 'finished')
