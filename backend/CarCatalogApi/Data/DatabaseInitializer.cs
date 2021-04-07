using System;
using Car_catalog.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Car_catalog.Data
{
    public static class DatabaseInitializer
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Color>().HasData(
                new { Id = 1L, Name = "White", Rgb = 1 },
                new { Id = 2L, Name = "Black", Rgb = 1 },
                new { Id = 3L, Name = "Purple", Rgb = 1 },
                new { Id = 4L, Name = "Red", Rgb = 1 },
                new { Id = 5L, Name = "Orange", Rgb = 1 }
            );

            modelBuilder.Entity<Brand>().HasData(
                new { Id = 1L, Name = "Tesla" },
                new { Id = 2L, Name = "Volkswagen" },
                new { Id = 3L, Name = "Toyota" },
                new { Id = 4L, Name = "Nissan" }
            );
            
            modelBuilder.Entity<Model>().HasData(
                new { Id = 1L, BrandId = 1L, Name = "S" },
                new { Id = 2L, BrandId = 1L, Name = "3" },
                new { Id = 3L, BrandId = 1L, Name = "Y" },
                new { Id = 4L, BrandId = 2L, Name = "ID.4" },
                new { Id = 5L, BrandId = 2L, Name = "Passat" },
                new { Id = 6L, BrandId = 2L, Name = "Golf" },
                new { Id = 7L, BrandId = 3L, Name = "Prius" },
                new { Id = 8L, BrandId = 3L, Name = "Premio" },
                new { Id = 9L, BrandId = 3L, Name = "Allion" }
            );
            modelBuilder.Entity<Car>().HasData(
                new Car { Id = 1L, ModelId = 1L, ColorId = 1L, EngineVolume = 700, Description = "Description 1" },
                new Car { Id = 2L, ModelId = 1L, ColorId = 2L, EngineVolume = 800, Description = "Description 2" },
                new Car { Id = 3L, ModelId = 2L, ColorId = 3L, EngineVolume = 400, Description = "Description 3" },
                new Car { Id = 4L, ModelId = 2L, ColorId = 4L, EngineVolume = 300, Description = "Description 4" },
                new Car { Id = 5L, ModelId = 4L, ColorId = 1L, EngineVolume = 200, Description = "Description 5" },
                new Car { Id = 6L, ModelId = 4L, ColorId = 2L, EngineVolume = 100, Description = "Description 6" },
                new Car { Id = 7L, ModelId = 5L, ColorId = 2L, EngineVolume = 400, Description = "Description 7" },
                new Car { Id = 8L, ModelId = 6L, ColorId = 2L, EngineVolume = 200, Description = "Description 8" },
                new Car { Id = 9L, ModelId = 7L, ColorId = 3L, EngineVolume = 200, Description = "Description 9" },
                new Car { Id = 10L, ModelId = 8L, ColorId = 3L, EngineVolume = 300, Description = "Description 10" }
                );

            modelBuilder.Entity<Price>().HasData(
                new { Id = 1L, CarId = 1L, Value = 70000m, CreatedAt = DateTime.Today.AddDays(-2) },
                new { Id = 2L, CarId = 1L, Value = 75000m, CreatedAt = DateTime.Today.AddDays(-1) },
                new { Id = 3L, CarId = 1L, Value = 80000m, CreatedAt = DateTime.Today },

                new { Id = 4L, CarId = 2L, Value = 60000m, CreatedAt = DateTime.Today.AddDays(-3) },
                new { Id = 5L, CarId = 2L, Value = 67000m, CreatedAt = DateTime.Today.AddDays(-1) },

                new { Id = 6L, CarId = 3L, Value = 40000m, CreatedAt = DateTime.Today.AddDays(-4) },
                new { Id = 7L, CarId = 3L, Value = 60000m, CreatedAt = DateTime.Today.AddDays(-1) },

                new { Id = 8L, CarId = 4L, Value = 30000m, CreatedAt = DateTime.Today.AddDays(-1) },
                new { Id = 9L, CarId = 5L, Value = 55000m, CreatedAt = DateTime.Today.AddDays(-2) },
                new { Id = 10L, CarId = 6L, Value = 30000m, CreatedAt = DateTime.Today.AddDays(-4) },
                new { Id = 11L, CarId = 7L, Value = 40000m, CreatedAt = DateTime.Today.AddDays(-2) },
                new { Id = 12L, CarId = 8L, Value = 20000m, CreatedAt = DateTime.Today.AddDays(-3) },
                new { Id = 13L, CarId = 9L, Value = 30000m, CreatedAt = DateTime.Today.AddDays(-2) },
                new { Id = 14L, CarId = 10L, Value = 40000m, CreatedAt = DateTime.Today.AddDays(-3) }
                );
        }
    }
}