using ToDoApp.Models.Dto;
using ToDoApp.Models.Entities;

namespace ToDoApp.Controllers;

public interface ITodoItemController {
  Task<TodoItem?>             Find(int                 id);
  Task<TodoItem?>             Create(CreateTodoItemDto dto);
  Task<TodoItem?>             Delete(int               id);
  Task<TodoItem?>             Update(int               id, UpdateTodoItemDto dto);
  Task<IEnumerable<TodoItem>> GetAll();
}
