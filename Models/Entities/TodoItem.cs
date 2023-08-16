using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ToDoApp.Models.Entities;

[Table("todo_items")]
[Index("CreatedAt", Name = "idx_todo_items")]
public partial class TodoItem
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("description")]
    [StringLength(1000)]
    public string Description { get; set; } = null!;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }

    [Column("is_checked")]
    public bool IsChecked { get; set; }
}
