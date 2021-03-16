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
    public class ColorController : ControllerBase
    {
        private readonly IColorRepository _colorRepository;
        private readonly IMapper _mapper;

        public ColorController(IColorRepository colorRepository)
        {
            _colorRepository = colorRepository;
            
            var config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<Color, ColorModel>();
                    cfg.CreateMap<ColorModel, Color>();
                });
            _mapper = new Mapper(config);
        }

        [HttpGet()]
        public async Task<ActionResult<List<ColorModel>>> GetAll()
        {
            var colors = _mapper.Map<List<ModelModel>>(_colorRepository.GetAll());
            return new OkObjectResult(colors);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<List<ModelModel>>> GetById(long id)
        {
            var color = _mapper.Map<ModelModel>(await _colorRepository.GetById(id));
            return new OkObjectResult(color);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ColorModel colormodel)
        {
            var color = _mapper.Map<Color>(colormodel);
            _colorRepository.Add(color);
            await _colorRepository.Save();


            return CreatedAtAction(nameof(GetById), new {id = color.Id}, color);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(long id, [FromBody] ModelModel modelmodel)
        {
            var color = _mapper.Map<Color>(modelmodel);
            color.Id = id;
            _colorRepository.Update(color);
            await _colorRepository.Save();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Edit(long id)
        {
            _colorRepository.DeleteById(id);
            await _colorRepository.Save();

            return NoContent();
        }
    }
}