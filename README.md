## Chat Websocket Frontend
### Esse repositorio faz parte de um projeto multirepo e esse é do frontend.
Então, não tive grandes problemas com o desenvolvimento fora vez ou outra que tive que refatorar<br>
longos trechos de código por que eu simplesmente esqueci como o React funcionava.<br>
Brincadeiras à parte, sobre o código não tem muito a ser dito com exceção de alguns componentes que<br>
eu tive que pensar um pouco mais na funcionalidade.

## Input de "códigos"
O primeiro deles foi esse input, lembro de ver alguns deles pela web e parecia algo interessante de codar.<br>
Eu optei por uma abordagem simples mas que talvez pareça um pouco mais complexa.<br>
Primeiro que eu queria um comportamento de "auto-seleção"<br>
```
1 -> 2 -> 3 -> 4 -> 1...
```
como existe o `Element.focus()` dos elementos Html fui nessa direção e, para acessar essa funcionalidade,<br>
usei usar a hook `useRef` do React.<br>
Portanto, tenho quatro referencias de elementos do tipo input e cada um com um único "id" de 0 a 3.<br>
Para fazer a seleção automática basta então "focar", após o click, no "id" atual mais 1:
```js
function handleInput(evt, id){
  inputsRefs[id+1].current.focus();
}
```
esse trecho por si só já faz "mágica" mas caso queira que do quarto volte para o primeiro<br>
o modifique para algo como isso:
```js
...
inputsRefs[(id + 1) % inputsRefs.length].current.focus();
```
essa solução deve funcionar com diferentes quantidades de inputs.<br>
Com isso em mãos só precisamos dar "join" caso os inputs estejam preenchidos<br>
Para isso, parti de um viés matemático onde:<br>
- se ao final da edição o valor for diferente de "" `if(typed!="")` adiciona-se 1 à variavel de controle
- caso contrario subtraia um da mesma variável<br>

Isso é possivel pois o input tem no máximo uma letra, logo, ou está preenchido ou não está.<br>
Depois disso é só verificar se a variavel de controle é igual a 4 e, se sim, chamar `join()`
![image](https://user-images.githubusercontent.com/74821126/223580028-819e5bc1-131d-40bc-87f9-fa8b6e948d5c.png)

