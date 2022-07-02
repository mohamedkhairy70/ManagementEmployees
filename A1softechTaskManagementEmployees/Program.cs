using A1softechTaskManagementEmployees.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

///////////////////////////////////////    Builder     //////////////////////////////////////////////

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<EmployeesDbContext>(cfg =>
                                            cfg.UseSqlServer(builder.Configuration.GetConnectionString("DefualtConnection")));


builder.Services.AddCors(cfg => cfg.AddPolicy("AllowWebApp", policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));
builder.Services.AddScoped(typeof(IRepository<>), typeof(GUIDRepository<>));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "A1softechTaskEmployees", Version = "v1" });
});




///////////////////////////////////////    App Builder     //////////////////////////////////////////////
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "A1softechTaskEmployees v1"));
    app.UseCors("AllowWebApp");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
