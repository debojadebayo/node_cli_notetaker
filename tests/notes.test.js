import { jest } from '@jest/globals';

jest.unstable_mockModule('../utils/db.js', () => ({
  insert: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insert, getDB, saveDB } = await import('../utils/db.js');
const { newNote, getAllNotes, removeNote } = await import('../utils/notes.js');

beforeEach(() => {
  insert.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
})

test('newNote inserts data and returns it', async ()=> {
    const note = 'test note'
    const tags = ['tag1', 'tag2']
    const data = {
        content:note,
        tags, 
        id: Date.now()
    }
    insert.mockResolvedValue(data)

    const result = await newNote(note, tags)
    expect(result.content).toEqual(data.content)
    expect(result.tags).toEqual(data.tags)
})

test('getAllNotes returns all notes from the database', async()=>{
    const db = {
        notes:['note1', 'note2', 'note3']
    }
    getDB.mockResolvedValue(db)
    
    const result = await getAllNotes()
    expect(result).toEqual(db.notes)
})

test('removeNote removes the note according to id and returns id', async()=>{
    const notes = [
        { id: 1, content: 'note 1' },
        { id: 2, content: 'note 2' },
        { id: 3, content: 'note 3' },
      ];

      saveDB.mockResolvedValue(notes);

       const idToRemove = 4
       const result = await removeNote(idToRemove)
       expect(result).toBeNull()

})