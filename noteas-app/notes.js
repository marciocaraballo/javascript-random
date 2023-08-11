import { promises as fs } from "fs";

const loadNotes = async () => {
    
    const data = await fs.readFile('./notes.json', { encoding: 'utf8' })

    try {
        const dataBufferString = data.toString();
        return JSON.parse(dataBufferString);
    } catch(e) {
        return []
    }
}

const saveNotes = async (notes) => {
    await fs.writeFile('./notes.json', JSON.stringify(notes));
}

const getNotes = async () => {

    const notes = await loadNotes();

    return notes;
}

const addNote = async (title, body) => {
    const notes = await loadNotes();

    const dedupedNotes = notes.find(note => note.title === title)

    debug();

    if (dedupedNotes === undefined) {
        notes.push({
            title,
            body
        })
    
        await saveNotes(notes);

        console.log('Note added successfully');
    } else {
        throw new Error('A note with the same title already exists')
    }
}

const removeNote = async (title) => {
    const notes = await loadNotes();

    const noteIndex = notes.findIndex(note => note.title === title)
    
    if (noteIndex !== -1) {
    
        notes.splice(noteIndex, 1)

        await saveNotes(notes);

        console.log('Note removed successfully');
    } else {
        throw new Error('A note with the title was not found to be removed')
    }
}

const readNote = async (title) => {
    const notes = await loadNotes();

    const noteIndex = notes.findIndex(note => note.title === title)

    if (noteIndex !== -1) {
        return notes[noteIndex].body;
    } else {
        throw new Error('A note with the title was not found to be removed')
    }
}

export {
    getNotes,
    addNote,
    removeNote,
    readNote
}