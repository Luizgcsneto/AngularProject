using Microsoft.EntityFrameworkCore;

namespace ChatApi.models
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> opcoes) :base(opcoes)
        {
            
        }

        public DbSet<Mensagem> Mensagens { get; set; }
    }
}
