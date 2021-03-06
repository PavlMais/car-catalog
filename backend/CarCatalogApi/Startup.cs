using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Car_catalog.Data;
using Car_catalog.Data.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace Car_catalog
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            
            string connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<EfContext>(options =>
                options.UseSqlServer(connection));
            
            services.AddTransient<ICarRepository, CarRepository>();  
            services.AddTransient<IBrandRepository, BrandRepository>();  
            services.AddTransient<IModelRepository, ModelRepository>();  
            services.AddTransient<IColorRepository, ColorRepository>();  
            services.AddLogging();
            
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "Car_catalog", Version = "v1"});
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, EfContext ctx)
        {
            ctx.Database.EnsureCreated();   
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Car_catalog v1"));
                app.UseCors(builder =>
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
                loggerFactory.CreateLogger("CAT:");
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}