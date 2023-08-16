﻿using System.Net;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Models.Dto;
using ToDoApp.Models.Entities;

namespace ToDoApp.Models.Services;

public class TodoService : ITodoService {
  private readonly TodoDbContext _dbContext;

  public TodoService(TodoDbContext dbContext) {
    _dbContext = dbContext;
  }

  public async Task<TodoItem?> Find(int id, HttpResponse response) {
    TodoItem? item = await _dbContext.TodoItems.FindAsync(id);

    if (item is not null) {
      response.StatusCode = (int)HttpStatusCode.NotFound;
    }

    return null;
  }

  public async Task<TodoItem?> Create(CreateTodoItemDto dto) {
    TodoItem item = new() {
      Description = dto.Description
    };

    await _dbContext.AddAsync(item);
    await _dbContext.SaveChangesAsync();

    return item;
  }

  public async Task<TodoItem?> Delete(int id, HttpResponse response) {
    TodoItem? item = await _dbContext.TodoItems.FindAsync(id);

    if (item is null) {
      response.StatusCode = (int)HttpStatusCode.NotFound;
      return null;
    }

    _dbContext.TodoItems.Remove(item);
    await _dbContext.SaveChangesAsync();

    return item;
  }

  public async Task<TodoItem?> Update(int id, UpdateTodoItemDto dto) {
    throw new NotImplementedException();
  }

  public async Task<IEnumerable<TodoItem>> GetAll() {
    return await _dbContext.TodoItems.OrderByDescending(t => t.UpdatedAt).ToListAsync();
  }
}
