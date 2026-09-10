import { useState } from "react";

function TaskSummary() {

  // Lista de tarefas
  const [tasks, setTasks] = useState([
    { id: 1, title: "Estudar React", completed: false },
    { id: 2, title: "Criar projeto Vite", completed: true },
    { id: 3, title: "Configurar Git", completed: false },
  ]);

  // Estado para o título da nova tarefa
  const [newTaskTitle, setNewTaskTitle] = useState("");
  // Contagem de tarefas concluidas
  const completedCount = tasks.filter((task) => task.completed).length;

  // Função para adicionar tarefas
  function addTask(e){
    e.preventDefault(); // Não deixar o navegador recarregar a pagina
    if(!newTaskTitle.trim()) return; // Não deixa adicionar tarefas em branco

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setNewTaskTitle(""); // Limpa o campo de texto depois de adicionar
  }

  // Função para marcar a tarefa como concluida
  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // FUnção para deletar a tarefa
  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  return (
    <section>
      <form onSubmit={addTask} className="add-task-form">
        <input type="text" placeholder="Digite uma nova tarefa..." value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)} className="task-input"
        />
        <button type="submit" className="btn-add">Adicionar</button>
      </form>

      <p className="summary-info">
        <strong>Concluídas:</strong> {completedCount} de {tasks.length}
      </p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span className={`task-title ${task.completed ? "completed" : ""}`}>
              {task.title}
            </span>
            <div className="actions">
              <button
                type="button"
                className="btn-complete"
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? "Reabrir" : "Concluir"}
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={() => deleteTask(task.id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function App() {
  return (
    <main>
      <header>
        <h1>TO-DO PRO</h1>
        <p>Organize suas tarefas em um só lugar!</p>
      </header>

      <section>
        <h2>Minhas Tarefas</h2>
        <TaskSummary />
      </section>
    </main>
  );
}

export default App;