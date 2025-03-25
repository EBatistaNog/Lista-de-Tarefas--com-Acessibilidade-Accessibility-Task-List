export function splitWordBySyllables(word: string): string[] {
    const dictionary: Record<string, string[]> = {
      estudar: ['es', 'tu', 'dar'],
      escola: ['es', 'co', 'la'],
      lapis: ['la', 'pis'],
      caneca: ['ca', 'ne', 'ca'],
      feliz: ['fe', 'liz'],
      cadeira: ['ca', 'dei', 'ra'],
      escrever: ['es', 'cre', 'ver'],
      aprender: ['a', 'pren', 'der'],
      tarefa: ['ta', 're', 'fa'],
      exemplo: ['e', 'xem', 'plo']
    };
  
    const cleaned = word
      .normalize('NFD')
      .replace(/[^a-zA-Z]/g, '')
      .toLowerCase();
  
    if (dictionary[cleaned]) {
      return dictionary[cleaned];
    }
  
    return [word];
  }
  