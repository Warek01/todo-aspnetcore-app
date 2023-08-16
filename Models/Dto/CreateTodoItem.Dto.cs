using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ToDoApp.Models.Dto;

public class CreateTodoItemDto {
  [JsonPropertyName("description"), Required, MinLength(1), MaxLength(1000)]
  public string Description { get; set; }
}
