using System.ComponentModel.DataAnnotations;

namespace FilmesTorloni.WebAPI.DTO;

public class LoginDTO
{
    [Required(ErrorMessage = "O Email do usuário é obrigatório!")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "A senha do usuário é obrigatória!")]
    public string? Senha { get; set; }
}
