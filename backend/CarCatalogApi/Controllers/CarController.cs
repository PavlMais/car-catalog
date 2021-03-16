using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Car_catalog.Data.Entities;
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
                    cfg.CreateMap<Car, CarModel>();
                    cfg.CreateMap<NewCarModel, Car>();
                });
            _mapper = new Mapper(config);
        }

        [HttpGet()]
        public async Task<ActionResult<List<CarModel>>> GetAll()
        {
            var cars = _mapper.Map<List<CarModel>>(_carRepository.GetAll());
            return new OkObjectResult(cars);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<List<CarModel>>> GetById(long id)
        {
            var cars = _mapper.Map<CarModel>(await _carRepository.GetById(id));
            return new OkObjectResult(cars);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] NewCarModel model)
        {
            var car = _mapper.Map<Car>(model);
            _carRepository.Add(car);
            car.Prices.Add(new Price(){Value = model.Price, CarId = car.Id});
            await _carRepository.Save();


            return CreatedAtAction(nameof(GetById), new {id = car.Id}, car);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(long id, [FromBody] NewCarModel model)
        {
            var car = _mapper.Map<Car>(model);
            car.Id = id;
            _carRepository.Update(car);
            await _carRepository.Save();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Edit(long id)
        {
            _carRepository.DeleteById(id);
            await _carRepository.Save();

            return NoContent();
        }
    }
}