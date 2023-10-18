import { Validatable } from './types.js'

function validate(validatableInput: Validatable) {
    let isValid = true

    if (validatableInput.required) {
        isValid =
            isValid && validatableInput.value.toString().trim().length !== 0
    }

    if (
        validatableInput.minLenght !== undefined &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid &&
            validatableInput.value.trim().length >= validatableInput.minLenght
    }

    if (
        validatableInput.maxLength !== undefined &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid &&
            validatableInput.value.trim().length <= validatableInput.maxLength
    }

    if (
        validatableInput.min !== undefined &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value >= validatableInput.min
    }

    if (
        validatableInput.max !== undefined &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value <= validatableInput.max
    }

    return isValid
}

export { validate }
