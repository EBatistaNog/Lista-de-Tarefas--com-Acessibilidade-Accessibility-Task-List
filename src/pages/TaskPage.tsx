import React, { useState, useRef } from 'react';

function splitWordBySyllables(word: string): string[] {
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

  const cleaned = word.normalize("NFD").replace(/[^a-zA-Z]/g, '').toLowerCase();
  if (dictionary[cleaned]) return dictionary[cleaned];

  return [word];
}

function formatWordForDyslexia(word: string): React.ReactNode {
  const syllables = splitWordBySyllables(word);
  return (
    <span style={{ display: 'inline-block', fontWeight: 600, fontSize: '1.1rem' }}>
      {syllables.map((syllable, index) => (
        <span key={index} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span>{syllable}</span>
          {index < syllables.length - 1 && (
            <span
              style={{
                margin: '0 3px',
                color: '#bbb',
                fontWeight: 'normal',
                fontSize: '0.9rem'
              }}
            >
              -
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

export default function TaskPage() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [highlightedTask, setHighlightedTask] = useState("");
  const [editTask, setEditTask] = useState({ enabled: false, task: "" });

  const inputRef = useRef<HTMLInputElement>(null);
  const lastTaskRef = useRef<HTMLLIElement>(null);

  const t = {
    title: "Lista de Tarefas",
    inputPlaceholder: "Digite o nome da tarefa...",
    add: "Adicionar tarefa",
    update: "Atualizar tarefa",
    edit: "Editar",
    delete: "Excluir",
    successAdd: (task: string) => `Tarefa \"${task}\" adicionada com sucesso.`,
    successUpdate: (task: string) => `Tarefa atualizada para \"${task}\".`,
    successDelete: (task: string) => `Tarefa \"${task}\" excluída.`,
    emptyInput: "Digite uma tarefa antes de continuar.",
    editing: (task: string) => `Editando tarefa \"${task}\".`
  };

  function handleRegister() {
    if (!input) {
      setStatusMessage(t.emptyInput);
      return;
    }

    if (editTask.enabled) {
      handleSaveEdit();
      return;
    }

    setTasks(prevTasks => [...prevTasks, input]);
    setStatusMessage(t.successAdd(input));
    setHighlightedTask(input);
    setInput("");

    setTimeout(() => {
      lastTaskRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);

    inputRef.current?.focus();
    setTimeout(() => setHighlightedTask(""), 1000);
  }

  function handleSaveEdit() {
    const index = tasks.findIndex(task => task === editTask.task);
    const allTasks = [...tasks];
    allTasks[index] = input;
    setTasks(allTasks);

    setEditTask({ enabled: false, task: '' });
    setStatusMessage(t.successUpdate(input));
    setHighlightedTask(input);
    setInput("");

    inputRef.current?.focus();
    setTimeout(() => setHighlightedTask(""), 1000);
  }

  function handleDelete(item: string) {
    const updatedTasks = tasks.filter(task => task !== item);
    setTasks(updatedTasks);
    setStatusMessage(t.successDelete(item));
    inputRef.current?.focus();
  }

  function handleEdit(item: string) {
    setInput(item);
    setEditTask({ enabled: true, task: item });
    setStatusMessage(t.editing(item));
    inputRef.current?.focus();
  }

  return (
    <main style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', background: '#fdfdfd', borderRadius: '8px', boxShadow: '0 0 12px rgba(0,0,0,0.05)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.8rem', color: '#333' }}>{t.title}</h1>

      <div
        aria-live="polite"
        role="status"
        style={{ marginBottom: '12px', color: '#2e7d32', fontWeight: 500, minHeight: '24px' }}
      >
        {statusMessage}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          id="task-input"
          ref={inputRef}
          placeholder={t.inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRegister();
          }}
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        <button
          onClick={handleRegister}
          style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: '#1976d2', color: '#fff', cursor: 'pointer' }}
        >
          {editTask.enabled ? t.update : t.add}
        </button>
      </div>

      <ul aria-label={t.title} style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((item, index) => {
          const isLast = index === tasks.length - 1;
          const isHighlighted = item === highlightedTask;

          return (
            <li
              key={item}
              ref={isLast ? lastTaskRef : null}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: isHighlighted ? '#e3f2fd' : '#fff',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                marginBottom: '10px',
                transition: 'background-color 0.3s ease'
              }}
            >
              <span style={{ flex: 1 }}>{formatWordForDyslexia(item)}</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => handleEdit(item)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>{t.edit}</button>
                <button onClick={() => handleDelete(item)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>{t.delete}</button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}