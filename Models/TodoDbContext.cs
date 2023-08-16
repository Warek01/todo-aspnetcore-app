using Microsoft.EntityFrameworkCore;
using ToDoApp.Models.Entities;

namespace ToDoApp.Models;

public partial class TodoDbContext : DbContext {
  public TodoDbContext() { }

  public TodoDbContext(DbContextOptions<TodoDbContext> options)
    : base(options) { }

  public virtual DbSet<TodoItem> TodoItems { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    modelBuilder.Entity<TodoItem>(entity => {
      entity.HasKey(e => e.Id).HasName("todo_items_pkey");

      entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
      entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
    });

    OnModelCreatingPartial(modelBuilder);
  }

  partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
