using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Car_catalog.Data.Entities;
using Car_catalog.Data.Models;
using Car_catalog.Data.Repositories;
using Car_catalog.Models;
using Microsoft.AspNetCore.Mvc;

namespace Car_catalog.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CarController : ControllerBase
    {
        private readonly ICarRepository _carRepository;
        private readonly IMapper _mapper;

        public CarController(ICarRepository carRepository)
        {
            _carRepository = carRepository;
            
            
            var config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<CarsResult, CarsResultModel>();
                    cfg.CreateMap<Car, CarModel>();
                    cfg.CreateMap<NewCarModel, Car>();
                    cfg.CreateMap<Price, PriceModel>();
                    cfg.CreateMap<Brand, BrandModel>();
                    cfg.CreateMap<Model, ModelModel>();
                    cfg.CreateMap<Color, ColorModel>();
                });
            _mapper = new Mapper(config);
        }

        [HttpGet()]
        public async Task<ActionResult<CarsResultModel>> GetAll([FromQuery] CarFilters carFilters)
        {
            var carsResult = _mapper.Map<CarsResultModel>(_carRepository.GetFiltered(carFilters));
            
            return new OkObjectResult(carsResult);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<List<CarModel>>> GetById(long id)
        {
            var eCar = await _carRepository.GetFullByIdAsync(id);
            
            var car = _mapper.Map<CarModel>(eCar);
            
            return new OkObjectResult(car);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] NewCarModel model)
        {
            var car = _mapper.Map<Car>(model);
            
            _carRepository.Add(car);
            car.Prices.Add(new Price(){Value = model.Price, CreatedAt = DateTime.Now});
            
            await _carRepository.SaveAsync();
            
            return CreatedAtAction(nameof(GetById), new {id = car.Id}, car);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(long id, [FromBody] NewCarModel model)
        {
            var car = await _carRepository.GetFullByIdAsync(id);
            _mapper.Map(model, car);

            var currentPrice = await _carRepository.GetCarCurrentPriceAsync(id);

            if (currentPrice != model.Price)
            {
                car.Prices.Add(new Price(){Value = model.Price, CreatedAt = DateTime.Now});
            }
            _carRepository.Update(car);
            
            await _carRepository.SaveAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            _carRepository.DeleteById(id);
            await _carRepository.SaveAsync();

            return NoContent();
        }
    }
}