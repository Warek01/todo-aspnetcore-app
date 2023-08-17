using ToDoApp.Models.Dto;
using ToDoApp.Models.Entities;

namespace ToDoApp.Models.Services;

public interface ITodoService {
  Task<TodoItem?>             Find(int id, HttpResponse response);
  Task<IEnumerable<TodoItem>> GetAll();
  Task<TodoItem?>             Create(CreateTodoItemDto dto);
  Task<TodoItem?>             Delete(int               id, HttpResponse      response);
  Task<TodoItem?>             Update(int               id, UpdateTodoItemDto dto, HttpResponse response);
}
