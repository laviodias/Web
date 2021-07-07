function gerarCor(){
    let teste = Array();
    teste[0] = '#'

    for(let i=1;i<7;i++){
        let x =  Math.floor(Math.random()*16).toString(16);
        teste[i] = x;
    }

    let color = teste.toString().replaceAll(',', '');

    document.getElementById("color").innerHTML = 'Color: ' + color;
    document.body.style.background = color;
}

gerarCor()