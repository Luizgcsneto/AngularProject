using System.Collections.Generic;
using System.Threading.Tasks;
using ChatApi.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MensagensController : ControllerBase
    {
          private readonly Contexto _contexto;

        public MensagensController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mensagem>>> PegarTodosAsync()
        {
            return await _contexto.Mensagens.ToListAsync();
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Mensagem>> PegarPeloId(int Id)
        {
            Mensagem mensagem = await _contexto.Mensagens.FindAsync(Id);
            if (mensagem == null)
                NotFound();

            return mensagem;
        }

        [HttpPost]
        public async Task<ActionResult<Mensagem>> SalvarMensagemAsync(Mensagem mensagem)
        {
            await _contexto.Mensagens.AddAsync(mensagem);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> AtualizarMensagemAsync(Mensagem mensagem)
        {
            _contexto.Mensagens.Update(mensagem);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeletarMensagemAsync(int Id)
        {
            Mensagem mensagem = await _contexto.Mensagens.FindAsync(Id);
            if (mensagem == null)
                return NotFound();
            _contexto.Remove(mensagem);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
        
    }
}