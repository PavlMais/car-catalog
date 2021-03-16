using System;
using Car_catalog.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Car_catalog.Data
{
    public class EfContext : DbContext
    {
        public EfContext(DbContextOptions<EfContext> options): base(options){}

        
        public virtual DbSet<Car> Cars { get; set; }
        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<Model> Models { get; set; }
        public virtual DbSet<Price> Prices { get; set; }
        public virtual DbSet<Color> Colors { get; set; }

    }
}