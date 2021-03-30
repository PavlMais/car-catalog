using System;
using System.Threading;
using Car_catalog.Data.Entities;
using Car_catalog.Data.KeylessEntity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using Microsoft.Extensions.Options;

namespace Car_catalog.Data
{
    public class EfContext : DbContext
    {
        private readonly ILoggerFactory _loggerFactory;
        public EfContext(DbContextOptions<EfContext> options, ILoggerFactory loggerFactory) : base(options)
        {
            this._loggerFactory = loggerFactory;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseLoggerFactory(_loggerFactory);
        }

        
        public virtual DbSet<Car> Cars { get; set; }
        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<Model> Models { get; set; }
        public virtual DbSet<Price> Prices { get; set; }
        public virtual DbSet<Color> Colors { get; set; }

        public virtual DbSet<CarPrice> CarPrices { get; set; }

    }
}