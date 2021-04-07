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
        public async Task<ActionResult<List<ModelModel>>> GetAll(long? brandId = null)
        {
            IEnumerable<Model> models;

            if (brandId.HasValue)
                models = await _modelRepository.GetByBrandId(brandId.Value);
            else
                models = await _modelRepository.GetAllAsync();
                
            
            return new OkObjectResult(_mapper.Map<List<ModelModel>>(models));
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<List<ModelModel>>> GetById(long id)
        {
            var model = _mapper.Map<ModelModel>(await _modelRepository.GetByIdAsync(id));
            return new OkObjectResult(model);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] NewModelModel modelmodel)
        {
            var model = _mapper.Map<Model>(modelmodel);
            _modelRepository.Add(model);
            await _modelRepository.SaveAsync();

            return CreatedAtAction(nameof(GetById), new {id = model.Id}, model);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(long id, [FromBody] NewModelModel model)
        {
          
            var currentModel = await _modelRepository.GetByIdAsync(id);
            
            _mapper.Map(model, currentModel);
            _modelRepository.Update(currentModel);
            await _modelRepository.SaveAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            _modelRepository.DeleteById(id);
            await _modelRepository.SaveAsync();

            return NoContent();
        }
    }
}