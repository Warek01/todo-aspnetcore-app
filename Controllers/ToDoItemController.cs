using System.Net;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Models.Dto;
using ToDoApp.Models.Entities;
using ToDoApp.Models.Services;

namespace ToDoApp.Controllers;

[Route("Todo")]
public class ToDoItemController : Controller, ITodoItemController {
  private readonly ITodoService _todoService;

  public ToDoItemController(ITodoService todoService) {
    _todoService = todoService;
  }

  [HttpGet, Route("Find/{id:int:min(0):required}")]
  public async Task<TodoItem?> Find(int id) {
    return await _todoService.Find(id, Response);
  }

  [HttpPost, Route("Create")]
  public async Task<TodoItem?> Create([FromBody] CreateTodoItemDto dto) {
    return await _todoService.Create(dto);
  }

  [HttpDelete, Route("Delete/{id:int:min(0):required}")]
  public async Task<TodoItem?> Delete(int id) {
    return await _todoService.Delete(id, Response);
  }

  [HttpPatch, Route("Update/{id:int:min(0):required}")]
  public Task<TodoItem?> Update(int id, UpdateTodoItemDto dto) {
    throw new NotImplementedException();
  }

  [HttpGet, Route("All")]
  public Task<IEnumerable<TodoItem>> GetAll() {
    return _todoService.GetAll();
  }
}
