using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication__JSON_Update.Models;

namespace WebApplication__JSON_Update.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/values/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/values
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/values/5
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/values/5
        //public void Delete(int id)
        //{
        //}

        private readonly IJsonDataManager _jsonDataManager;

        //public ValuesController(IJsonDataManager _jsonDataManager)
        //{
        //    _jsonDataManager = jsonDataManager;
        //}

        [HttpGet]
        public List<Person>  Get() //IHttpActionResult
        {
            // Use DependencyResolver to resolve IJsonDataManager.
            var _jsonDataManager = new JsonDataManager();

            List<Person> people = _jsonDataManager.GetAllPeople();
            return people;   // Ok(people);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            // Use DependencyResolver to resolve IJsonDataManager.
            //IJsonDataManager _jsonDataManager = (IJsonDataManager)GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IJsonDataManager));
            var _jsonDataManager = new JsonDataManager();

            Person person = _jsonDataManager.GetPerson(id);
            if (person == null)
            {
                return NotFound();
            }
            return Ok(person);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody] Person person)
        {
            // Use DependencyResolver to resolve IJsonDataManager.
            var _jsonDataManager = new JsonDataManager();

            _jsonDataManager.AddPerson(person);
            return Created(new Uri(Request.RequestUri + "/" + person.Id), person);
        }

        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody] Person updatedPerson)
        {
            // Use DependencyResolver to resolve IJsonDataManager.
            var _jsonDataManager = new JsonDataManager();

            if (_jsonDataManager.UpdatePerson(id, updatedPerson))
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return NotFound();
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            // Use DependencyResolver to resolve IJsonDataManager.
            var _jsonDataManager = new JsonDataManager();

            if (_jsonDataManager.DeletePerson(id))
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return NotFound();
        }

    }
}
