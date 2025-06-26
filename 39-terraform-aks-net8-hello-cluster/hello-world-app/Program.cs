var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Serving as a Controller
app.MapGet("/", () => "Hello World - served by .NET 8!");

app.Run();
