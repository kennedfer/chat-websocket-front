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
usei a hook `useRef` do React.<br>
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
Depois disso é só verificar se a variavel de controle é igual a 4 e, se sim, chamar `join()`<br>
PS: Lembre se de verificar se os antigos valores e os novos são diferentes<br>
`if(typed != vazio && lastTyped == vazio)` Adicione<br>
`if(typed != vazio && lastTyped != vazio)` Não adicione<br>
isso faz com que, caso o usuário troque uma letra por outra, o código não adicione mais um à variável.<br>
Talvez pareça confuso mas com alguns testes voce vê que é preciso 
<br>
![image](https://user-images.githubusercontent.com/74821126/223580028-819e5bc1-131d-40bc-87f9-fa8b6e948d5c.png)
<br>

## Floating Action Button
Sobre o FAB não tem muito segredo é basicamente deixar um placeholder embaixo do "chat" (das mensagens no caso)<br>
e mostrar ele caso o usuario esteja vendo o placeholder, simples não?<br>
Fazer isso tambem é simples usando o `IntersectionObserver`, eu inclusive fiz um hook dele mas com os valores inversos<br>
pois, nesse caso em especifico, ficaria melhor escrito, algo como `if(!placeholderIsVisible())` para `if(placeholderIsNotVisible())`<br>
O código é simples e nem tem muito o que ser dito, só olhar que dá pra "pegar" o conceito
![image](https://user-images.githubusercontent.com/74821126/223595349-88c5a7da-80cd-43c4-904e-b512fedff56b.png)
<br>

## Input de mensagem com crescimento automático
Nesse aqui parti novamente pelo caminho das referências, de maneira resumida, o input é "setado" para a altura de uma linha<br>
e a partir dai a nova altura dele é baseada na altura do scroll `inputRef.current.scrollHeight`<br> 
com isso temos um input que cresce sem limites, então, para limitarmos ele à X linhas, basta calcular `X * altura de uma linha`<br>
e verificar se a nova altura é maior, caso seja, basta "seta-la" ao valor de `X * altura de uma linha`
![image](https://user-images.githubusercontent.com/74821126/223792136-50a18a26-655d-427a-b237-9274a2c8131b.png)
<br>

## Mensagens
Esse componente é bem simples, além de ser uma div com metade da largura total do container cada pode ter um de três tipos diferentes:<br>
- "decorator": É usado para "desenhar" o nome do dono da sequencia de mensagem, a lógica é básica, basta verificar se o dono da mensagem atual
  é diferente do dono da ultima mensagem, se sim, adicione uma mensagem do tipo "decorator" com o conteúdo sendo o nome do usuário
- "user": Tipo usado para marcar as mensagens como do usuario e, claro, estilizar de um jeito diferente
- "group": Tipo default de estilo mas preferi manter ele nesse tipo para um melhor controle
![image](https://user-images.githubusercontent.com/74821126/223790160-81b21eb7-d0ce-48de-ae1e-aefc9d6b8e62.png)
<br>

## Alguns detalhes extras:
- O chat é uma SPA mas sem muita engenharia por trás, os sistemas são todos baseados em renderização condicional
- O "apelido" é salvo localmente então sim, dá pra ter mais de um "fulano" no chat o que vai diferenciar é o "#xxxx"
  ficaria algom como "fulano#1234" e "fulano#4321"
- Usei `tailwindcss` para estilizar, já usava uma abordagem parecida nas classes e ele é bem mais abrangente
- Usei `react-hot-toast` para as notificações de "sala não encontrada" e "conectando ao servidor..."
- Esse projeto foi feito com esforço e é sim uma solução funcional, mas, novamente, não é muito robusto
  sendo melhor visto como um ponto inicial que ainda pode ser incrementado
- E, claro, isso tudo foi só um resumo e vários pontos estão diferentes do codigo real
  a ideia foi passada mas caso tenha algum trecho que 'passou batido' o código completo está disponivel


