import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import { getNotes, addNote, removeNote, readNote } from './notes.js' 

yargs(hideBin(process.argv))
  .command({
    command: 'notes <title> <body>',
    desc: 'Notes handling',
    builder: yargs => yargs
      .positional('title', { type: 'string', description: 'Note title' })
      .positional('body', { type: 'string', description: 'Note body' })
      .option('operation', { 
        type: 'string', 
        choices: ['add', 'remove', 'list', 'read'] 
      })
      .demandOption('operation', 'Please provide an operation')
      .demandOption('title', 'Please provide a title')
      .demandOption('body', 'Please provide a body'),
    handler: async (argv) => {
      const { title, body, operation } = argv
      console.log(`Operation: ${operation}, title: ${title}, body: ${body}`)
      switch(operation) {
        case 'add':
            await addNote(title, body)
            break;
        case 'remove':
            await removeNote(title)
            break
        case 'list':
            await getNotes()
            break
        case 'read':
            const body = await readNote(title)
            console.log("Note body: \"" + body + "\"")
            break
        default:
            throw new Error('Unsupported operation');
      }
    }
  })
  .strict()
  .parse()