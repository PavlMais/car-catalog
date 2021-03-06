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
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _brandRepository;
        private readonly IMapper _mapper;

        public BrandController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
            
            var config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<Brand, BrandModel>();
                    cfg.CreateMap<NewBrandModel, Brand>();
                });
            _mapper = new Mapper(config);
        }
        
        
        [HttpGet()]
        public async Task<IActionResult> GetAll()
        {
            var brands = _mapper.Map<List<BrandModel>>(await _brandRepository.GetAllAsync());
            return new OkObjectResult(brands);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<List<BrandModel>>> GetById(long id)
        {
            var brand = _mapper.Map<BrandModel>(await _brandRepository.GetByIdAsync(id));
            return new OkObjectResult(brand);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] NewBrandModel model)
        {
            var brand = _mapper.Map<Brand>(model);
            _brandRepository.Add(brand);
            await _brandRepository.SaveAsync();

            return CreatedAtAction(nameof(GetById), new {id = brand.Id}, brand);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(long id, [FromBody] NewBrandModel model)
        {
            var brand = await _brandRepository.GetByIdAsync(id);
            
            _mapper.Map(model, brand);
            _brandRepository.Update(brand);
            await _brandRepository.SaveAsync();
            
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            _brandRepository.DeleteById(id);
            await _brandRepository.SaveAsync();

            return NoContent();
        }
    }
}