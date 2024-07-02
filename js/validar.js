//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var cadastro = document.querySelector("#submitButton");
var cadastroHelp = document.querySelector("#submitResult");
var forcaSenha = document.querySelector("#passStrengthMeter")


let validName = false;




/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e){

	nomeHelp.textContent = "";
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;
    
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido\n O nome precisa começar com letra maiúcula, só conter letras e ser separado por espaços "; 
        nomeHelp.style.color="red";
		validName = false;
    }
    else{
        nomeHelp.textContent = "";
		validName = true;
    }       
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

let validYoB = false;

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener('focusout', () => {
	
	anoHelp.textContent = "";
    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    //tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
		validYoB = false;
    }
    else{
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear()); 
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear()) ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()}.`;
            anoHelp.style.color="red";
			validYoB = false;
        }
        else if( parseInt(anoTrimado) < parseInt(date.getFullYear())-120 ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-120}.`;
            anoHelp.style.color="red";
			validYoB = false;
        }
        else{
            anoHelp.textContent="";
			validYoB = true;
        }        
        
    }
});


let validEmail = false;

email.addEventListener('focusout', validarEmail);

function validarEmail(e){
    emailHelp.textContent = "";

    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(?:br|com|net|org)$/;

    console.log(e);
    console.log(e.target.value);

    if(e.target.value.match(regexEmail) == null){
        emailHelp.textContent = `E-mail inválido.`;
        emailHelp.style.color="red";
		validEmail = false;
    }
    else{
        emailHelp.textContent="";
		validEmail = true;
    }   
}

let validPassword = false;

senha.addEventListener('input', validarSenha);

function validarSenha(e){
	senhaHelp.textContent = "";

	const regexWeak = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\d\s]).+$/;
	const regexStrong = /^(?=(?:.*[A-Z]){2})(?=(?:.*\d){2})(?=(?:.*[^\w\d\s]){2}).+$/;

	let passwordState = 0;
	let userName = nome.value.toLowerCase().split(" ");
	let lowercasePassword = e.target.value.toLowerCase();
	let namePresent = userName.some(name => lowercasePassword.includes(name));
	let yearOfBirth = ano.value;


	console.log(e);
	console.log(e.target.value);
	
	let correctSize = (e.target.value.length >= 6) && (e.target.value.length <= 20)
	
	console.log(correctSize);
	console.log(!namePresent);
	console.log(!e.target.value.includes(yearOfBirth));
	console.log(e.target.value.length);
	

	if(correctSize && !namePresent && !e.target.value.includes(yearOfBirth)){
		if(e.target.value.match(regexStrong) && e.target.value.length >= 12){
			passwordState = 3;
		}
		else if(e.target.value.match(regexWeak)){
			if(e.target.value.length >= 8){
				passwordState = 2;
			}
			else{
				passwordState = 1;
			}
		}
		else{
			passwordState = 0;
		}
	}

	switch(passwordState){
		case 0:
			senhaHelp.style.color = "red"
			senhaHelp.textContent = "Senha Inválida"
			validPassword = false;
			break;
		case 1:
			senhaHelp.style.color = "orange"
			senhaHelp.textContent = "Senha Fraca"
			forcaSenha.value = 9
			validPassword = true;
			break;
		case 2:
			senhaHelp.style.color = "yellow"
			senhaHelp.textContent = "Senha Moderada"
			forcaSenha.value = 18
			validPassword = true;
			break;
		case 3:
			senhaHelp.style.color = "green"
			senhaHelp.textContent = "Senha Forte"
			forcaSenha.value = 30
			validPassword = true;
			break;
		default:
			senhaHelp.style.color = "red"
			senhaHelp.textContent = "Senha Inválida"
			validPassword = false;
			break;
  }
}

cadastro.addEventListener("click", submitRegistration);

function submitRegistration(){
	
	console.log(validName);
	console.log(validYoB);
	console.log(validEmail);
	console.log(validPassword);
	
	cadastroHelp.textContent = "";
	
    if(validName && validYoB && validEmail && validPassword){
        cadastroHelp.textContent = "Cadastro Válido";
        cadastroHelp.style.color = "green";
    }
    else{
        cadastroHelp.textContent = "Cadastro Inválido";
        cadastroHelp.style.color = "red";
    }
}




