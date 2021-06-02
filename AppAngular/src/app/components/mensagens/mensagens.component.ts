import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Mensagem } from 'src/app/Mensagem';
import { MensagensService } from 'src/app/mensagens.service';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {

  formulario: any;
  tituloFormulario!: string;
  mensagens : Mensagem[];

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  constructor(private mensagensService : MensagensService) { }

  ngOnInit(): void {

    this.mensagensService.pegartodos().subscribe(resultado =>{
      this.mensagens = resultado;
      console.log(resultado)
    })

  }

  ExibirFormularioCadastro(): void
  {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = "Enviar Mensagem"
    this.formulario = new FormGroup({
      conteudo: new FormControl(null),

    });
  }

  EnviarFormulario(): void
  {
    const mensagem : Mensagem = this.formulario.value;
    if(!mensagem.conteudo){
      alert("favor preencher a mensagem");
      return
    }
    if(mensagem.id > 0)
    {
      this.mensagensService.atualizarMensagem(mensagem).subscribe(resultado => {
        this.visibilidadeTabela = true;
        this.visibilidadeFormulario = false;
        alert("Mensagem atualizada com sucesso");
        this.mensagensService.pegartodos().subscribe(registros => {
          this.mensagens = registros;
        });
      });
    }
    else
    {
       this.mensagensService.salvarMensagem(mensagem).subscribe(resultado => {
        this.visibilidadeTabela = true;
        this.visibilidadeFormulario = false;
        alert("Mensagem enviada com sucesso");
        this.mensagensService.pegartodos().subscribe(registros => {
          this.mensagens = registros;
        });
      });
    };
  }

    ExibirFormularioAtualizacao(Id): void
    {
      this.visibilidadeTabela = false;
      this.visibilidadeFormulario = true;

      this.mensagensService.pegarPeloId(Id).subscribe(resultado =>{
        this.tituloFormulario = `Atualizar Mensagem`;

        this.formulario = new FormGroup({
          id: new FormControl(resultado.id),
          conteudo: new FormControl(resultado.conteudo),

        });
      });
    }

    Voltar(): void
    {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
    }

    Excluir(Id): void {

      this.mensagensService.excluirMensagem(Id).subscribe(resultado => {

      })
    }

}
