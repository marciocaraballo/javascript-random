interface Draggable {
    dragStartHandler(event: DragEvent): void
    dragEndHandler(event: DragEvent): void
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void
    dropHandler(event: DragEvent): void
    dragLeaveHandler(event: DragEvent): void
}

interface Validatable {
    value: string | number
    required?: boolean
    minLenght?: number
    maxLength?: number
    min?: number
    max?: number
}

enum ProjectStatus {
    ACTIVE,
    FINISHED,
}

type Listener<T> = (items: T[]) => void

export type { Validatable, Listener, Draggable, DragTarget }
export { ProjectStatus }
