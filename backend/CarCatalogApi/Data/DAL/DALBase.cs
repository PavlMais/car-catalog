using System.Collections.Generic;
using AutoMapper;
using Car_catalog.Data.Entities;
using Car_catalog.Data.Repositories;
using Car_catalog.Models;

namespace Car_catalog.Data.DAL
{
    public abstract class DALBase<T, TModel, TNewModel> where T : BaseEntity
    {
        public IRepositoryBase<T> Repository { get; set; }
        private readonly IMapper _mapper;

        public DALBase(IMapper mapper)
        {
            _mapper = mapper;
        }

        public void Add(TNewModel model)
        {
            Repository.Add(_mapper.Map<T>(model));
        }

        public List<TModel> GetAll()
        {
            return _mapper.Map<List<TModel>>(Repository.GetAll());
        }
        
    }

    public class TopicDAL : DALBase<Car, CarModel, NewCarModel>
    {
        public TopicDAL(IMapper mapper) : base(mapper)
        {
            
        }
    }
}