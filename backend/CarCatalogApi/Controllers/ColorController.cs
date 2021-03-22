using System;
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
                    cfg.CreateMap<NewColorModel, Color>();
                });
            _mapper = new Mapper(config);
        }

        [HttpGet()]
        public async Task<ActionResult<List<ColorModel>>> GetAll()
        {
            var colors = _mapper.Map<List<ColorModel>>(_colorRepository.GetAll());
            return new OkObjectResult(colors);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<List<ColorModel>>> GetById(long id)
        {
            var color = _mapper.Map<ColorModel>(await _colorRepository.GetById(id));
            return new OkObjectResult(color);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] NewColorModel colorModel)
        {
            Console.WriteLine(colorModel.Name);
            var color = _mapper.Map<Color>(colorModel);
            Console.WriteLine(color.Name);
            _colorRepository.Add(color);
            await _colorRepository.Save();

            return CreatedAtAction(nameof(GetById), new {id = color.Id}, color);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(long id, [FromBody] NewColorModel colorModel)
        {
            var color = _mapper.Map<Color>(colorModel);
            color.Id = id;
            _colorRepository.Update(color);
            await _colorRepository.Save();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            _colorRepository.DeleteById(id);
            await _colorRepository.Save();

            return NoContent();
        }
    }
}