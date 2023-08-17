using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ToDoApp.Models.Dto;

public class UpdateTodoItemDto {
  [JsonPropertyName("description"), MinLength(1), MaxLength(1000)]
  public string? Description { get; set; }

  [JsonPropertyName("isChecked")] public bool? IsChecked { get; set; }
}
