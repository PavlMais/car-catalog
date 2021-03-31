using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Car_catalog.Data.Entities;
using Car_catalog.Data.Repositories;
using Car_catalog.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Car_catalog.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ModelController : ControllerBase
    {
        private readonly IModelRepository _modelRepository;
        private readonly IMapper _mapper;

        public ModelController(IModelRepository modelRepository)
        {
            _modelRepository = modelRepository;
            
            
            var config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<Model, ModelModel>();
                    cfg.CreateMap<NewModelModel, Model>();
                });
            _mapper = new Mapper(config);
        }

        [HttpGet()]
        public async Task<ActionResult<List<ModelModel>>> GetAll(int? brandId = null)
        {

            List<Model> models;
            
            if (brandId != null)
                models = await _modelRepository.GetAll().Where(q => q.BrandId == brandId).ToListAsync();
            else
                models = await _modelRepository.GetAll().ToListAsync();
                
            
            return new OkObjectResult(_mapper.Map<List<ModelModel>>(models));
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<List<ModelModel>>> GetById(long id)
        {
            var model = _mapper.Map<ModelModel>(await _modelRepository.GetById(id));
            return new OkObjectResult(model);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] NewModelModel modelmodel)
        {
            var model = _mapper.Map<Model>(modelmodel);
            _modelRepository.Add(model);
            await _modelRepository.Save();


            return CreatedAtAction(nameof(GetById), new {id = model.Id}, model);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(long id, [FromBody] NewModelModel modelmodel)
        {
            var model = _mapper.Map<Model>(modelmodel);
            model.Id = id;
            _modelRepository.Update(model);
            await _modelRepository.Save();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            _modelRepository.DeleteById(id);
            await _modelRepository.Save();

            return NoContent();
        }
    }

}