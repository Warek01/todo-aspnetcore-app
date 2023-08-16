using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ToDoApp.Models;
using ToDoApp.Models.Services;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<TodoDbContext>(options =>
  options.UseNpgsql(
    builder.Configuration.GetConnectionString("Default")
  )
);
InitDI(builder);

if (builder.Environment.IsDevelopment()) {
  builder.Services.AddEndpointsApiExplorer();
  builder.Services.AddSwaggerGen(options => {
    options.SwaggerDoc("v1", new OpenApiInfo {
      Version     = "v1",
      Title       = "To Do App API V1",
      Description = "An ASP.NET Core Web API for managing ToDo items",
    });

    // using System.Reflection;
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
  });
}

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment()) {
  InitSwagger(app);
}

if (!app.Environment.IsDevelopment()) {
  app.UseHsts();
  app.MapFallbackToFile("index.html");
}

app.UseHttpsRedirection();
app.UseFileServer();
app.UseRouting();
app.UseCors(options => {
  options.AllowAnyOrigin();
  options.AllowAnyHeader();
  options.AllowAnyMethod();
});

app.MapControllerRoute(
  name: "default",
  pattern: "{controller}/{action=Index}/{id?}");

app.Run();
return;


void InitSwagger(WebApplication app) {
  app.UseSwagger();
  app.UseSwaggerUI(options => {
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "To Do App API V1");
    options.RoutePrefix = string.Empty;
  });
}

void InitDI(WebApplicationBuilder builder) {
  builder.Services.AddScoped<ITodoService, TodoService>();
}
