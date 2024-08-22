import { getDB, saveDB, insert } from './db.js'

//creates new note using the insert helper function 
export const newNote = async (note, tags) => {
    const data = {
        tags,
        content: note, 
        id: Date.now()
    }
    await insert(data)
    return data
    
}

//gets all notes

export const getAllNotes = async () => {
    const db = await getDB()

    if(db.notes.length > 0){
        return db.notes
    } else {
        console.log("No notes in your database")
    }
}

// find the specific note according to a string

export const findNote  = async (filter) => {
    const notes  = await getAllNotes()
    return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()))

}

//removes a note 

export const removeNote = async (id) => {
    const notes = await getAllNotes()
    const match =  notes.find(note => note.id === id)

    if (match) {
        const newNotes = notes.filter(note => note.id !== id)
        await saveDB({notes: newNotes})
        return id
    } else {
        return null 
    }
}

export const removeAllNotes = async () => {
    await saveDB({notes: []})
}