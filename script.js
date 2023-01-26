
document.addEventListener('DOMContentLoaded', () => {

    const settingsIcon = document.querySelector('.settings-icon');
    const settingsContainer = document.querySelector('.settings-container');
    const closeIcon = document.querySelector('.close-icon');

    const arrowUps = document.querySelectorAll('.arrow-up');
    //console.log(arrowUps); //NodeList(3) [img.arrow-up, img.arrow-up, img.arrow-up]
    const arrowDowns = document.querySelectorAll('.arrow-down');
    //console.log(arrowDowns); //NodeList(3) [img.arrow-down, img.arrow-down, img.arrow-down]

    const pomodoroNumber = document.querySelector('.pomodoro-number');
    const longBreakNumber = document.querySelector('.long-break-number');
    const shortBreakNumber = document.querySelector('.short-break-number');

    //DISPLAY/DO NOT DISPLAY SETTINGS
    settingsIcon.addEventListener('click', () => {
        settingsContainer.style.display = 'flex';
    });

    //Tinha feito a próxima secção de código dentro da função gatilhada pelo evento 'click' no settingsIcon, mas, dessa forma, iria estar constantemente a ler e a executar as mesmas instruções, sempre que clicasse no settingsIcon. Assim fica mais otimizado.

    closeIcon.addEventListener('click', () => {
        settingsContainer.style.display = 'none';
    });

    //INCREASE/DECREASE NUMBER OF MINUTES
    arrowUps.forEach(arrowUp => {
        arrowUp.addEventListener('click', (eventObject) => {
            //console.log(eventObject.target.parentElement.previousSibling.previousSibling);
            let _Number = eventObject.target.parentElement.previousSibling.previousSibling;
            //chamei _Number à variável pq pode ser o div.pomodoroNumber, div.longBreakNumber ou div.shortBreakNumber
            _Number.innerText = +_Number.innerText + 1; //converto de string para number e somo 1
        });
    });

    arrowDowns.forEach(arrowDown => {
        arrowDown.addEventListener('click', (eventObject) => {
            let _Number = eventObject.target.parentElement.previousSibling.previousSibling;
            if(+_Number.innerText > 0){ //não posso selecionar minutos negativos
                _Number.innerText = +_Number.innerText - 1;
            };
        });
    });

    const fontOptions = document.querySelector('.font-options');
    const colorOptions = document.querySelector('.color-options');
    const timeLeft = document.querySelector('.time-left');
    const apply = document.querySelector('.apply');

    //SELECT THE FONT OPTION
    Array.from(fontOptions.children).forEach(fontOption => {
        fontOption.addEventListener('click', () => {
            Array.from(fontOptions.children).forEach(fontOption => {
                fontOption.classList.remove('selected-font');
            });
            fontOption.classList.add('selected-font');
        });
    });

    //SELECT THE COLOR OPTION
    Array.from(colorOptions.children).forEach(colorOption => {
        colorOption.addEventListener('click', () => {
            Array.from(colorOptions.children).forEach(colorOption => {
                colorOption.classList.remove('selected-color');
            });
            colorOption.classList.add('selected-color');
        });
    });

    const minutes = document.querySelector('.minutes');
    const seconds = document.querySelector('.seconds');
    const circle = document.querySelector('circle');
    //const active = document.querySelector('.active'); PROBLEMA: Tinha feito assim, mas não posso ir buscar o primeiro elemento com a class .active e alterar a background-color... pq assim não ia estar a alterar a background-color da class, mas sim a do *elemento*!!! Isso iria causar problemas, quando quisesse passar de um state para o outro. Mesmo removendo a class, o state anterior iria ficar com a background-color alterada. SOLUÇÃO: CSS variables

    const body = document.querySelector('body');
    const states = document.querySelector('.states');

    apply.addEventListener('click', () => {
        
        //console.log('pomodoroNumber: ' + pomodoroNumber.innerText, '\nshortBreakNumber: ' + shortBreakNumber.innerText, '\nlongBreakNumber: ' + longBreakNumber.innerText);

        //ESCREVE PARA O TEMPORIZADOR O NÚMERO DE MINUTOS SELECIONADOS PARA O POMODORO STATE
        //(Sempre que as definições são alteradas, voltamos ao layout inicial - pomodoro state ativo - e a contagem dos intervalos de trabalho volta a zero)

        minutes.innerText = +pomodoroNumber.innerText >= 10 ? pomodoroNumber.innerText : '0' + pomodoroNumber.innerText; //para não escrever 2:00. Escrever 02:00. Fica mais bonito

        seconds.innerText = '00'; //é necessário nos casos em que o user para o temporizador e altera os minutos nos settings. Sem este passo, ficariam os minutos selecionados : os segundos no qual parou

        Array.from(states.children).forEach(state => {
            if(state.classList.contains('active')){
                state.classList.remove('active');
            };
            pomodoroState.classList.add('active');
        });

        //Redefinir o step e zerar a count - se o user alterar os settings, é necessário recalcular o step consoante os novos minutos que escolheu
        totalMinutes = +pomodoroNumber.innerText;
        step = 879/totalMinutes;
        dash = 0;
        gap = 879;

        count = 0;

        //CHANGE THE FONT
        Array.from(fontOptions.children).forEach(fontOption => {
            if(fontOption.classList.contains('selected-font')){ //vai buscar a selected font
                if(fontOption.classList.contains('roboto')){
                    timeLeft.style.fontFamily = 'Roboto, sans-serif'; //e atribui essa font ao timeLeft
                }else if(fontOption.classList.contains('montserrat')){
                    timeLeft.style.fontFamily = 'Montserrat, sans-serif';
                }else if(fontOption.classList.contains('ibm-plex-sans')){
                    timeLeft.style.fontFamily = 'IBM Plex Sans, sans-serif';
                };
            };
        });

        /* NOTA: não posso fazer assim (ver linha 75)
        Array.from(colorOptions.children).forEach(colorOption => {
            if(colorOption.classList.contains('selected-color')){
                if(colorOption.classList.contains('pink-circle')){
                    circle.style.stroke = '#f87070';
                    active.style.backgroundColor = '#f87070';
                    apply.style.backgroundColor = '#f87070';
                }else if(colorOption.classList.contains('cyan-circle')){
                    circle.style.stroke = '#6ef3fc';
                    active.style.backgroundColor = '#6ef3fc';
                    apply.style.backgroundColor = '#6ef3fc';
                }else if(colorOption.classList.contains('violet-circle')){
                    circle.style.stroke = '#da81f8';
                    active.style.backgroundColor = '#da81f8';
                    apply.style.backgroundColor = '#da81f8';
                };
            };
        });
        */

        //CHANGE THE COLOR THEME
        Array.from(colorOptions.children).forEach(colorOption => {
            if(colorOption.classList.contains('selected-color')){
                if(colorOption.classList.contains('cyan-circle')){
                    body.classList.remove('violet-theme');
                    body.classList.add('cyan-theme');
                }else if(colorOption.classList.contains('violet-circle')){
                    body.classList.remove('cyan-theme');
                    body.classList.add('violet-theme');
                }else{ //fica com a cor de default (:root)
                    body.classList.remove('cyan-theme');
                    body.classList.remove('violet-theme');
                }; //este último else é necessário pq, se escolher uma das outras cores e depois mudar de ideias e selecionar a pink, tenho de remover a class da cor que escolhi antes. Caso contrário, sobrepor-se-á àquilo que está definido na :root
            };
        });

        //tinha escrito um código equivalente aos 2 blocos anteriores fora do apply.addEventListener('click', () => {...}), mas assim, as alterações no layout seriam imediatas e eu quero que as alterações no tipo de letra e cor se vejam apenas DEPOIS de clicar no Apply
               
        //FECHAR, AUTOMATICAMENTE, OS SETTINGS (sem ter de clicar na cruzinha)
        settingsContainer.style.display = 'none';
    });


    //COUNTDOWN
    const innerCircle = document.querySelector('.inner-circle');

    let clickCount = 0;
    innerCircle.addEventListener('click', () => {
        clickCount += 1;
        //alternar entre iniciar/pausar o temporizador, consoante o número de cliques
        clickCount % 2 === 0 ? pauseTimer() : startTimer();
    });

    const pomodoroState = document.querySelector('.pomodoro-state');
    const shortBreakState = document.querySelector('.short-break-state');
    const longBreakState = document.querySelector('.long-break-state');

    //Isto é lido uma vez e é necessário, pois o user pode não aceder aos settings e, nesse caso, o totalMinutes inicial é o de default (ver linha 87)
    let totalMinutes = +pomodoroNumber.innerText; //converte de string para number para conseguir fazer o cálculo; vai buscar os minutos do pomodoro state (inicialmente)
    let step = 879/totalMinutes; //número de unidades (pixeis) que a progress-bar vai andar em 1min
    //Se arredondar o step, há o risco de sobrar espaço e do stroke da progress bar não fechar totalmente, por isso, vou manter o número de pixeis assim, mesmo que possa ter casas decimais
    let dash = 0;
    let gap = 879;

    let count = 0;

    function startTimer(){

        timerId = setInterval(function myFunction(){
            if(+seconds.innerText !== 0){
                //este if else statement é para não ficar, por ex., 02:1, mas sim, 02:01.
                if(+seconds.innerText > 10){
                    seconds.innerText = +seconds.innerText - 1;
                }else{
                    seconds.innerText = '0' + (+seconds.innerText - 1).toString();
                }; 

            }else{ //se xx:00 (estamos no inicio do contador ou já passou 1 min e a progress bar aumenta)
                circle.style.strokeDasharray = `${dash} ${gap}`; //tenho de escrever isto ANTES de modificar o dash e o gap pq quando se inicia a contagem, os segundos são 00, mas ainda não passou 1 min, então não faz sentido fazer com que a progress bar ande logo

                dash += step;
                gap -= step;

                if(+minutes.innerText !== 0){ //se (atingirmos os 00 segundos e) ainda houver minutos
                    if(+minutes.innerText > 10){
                        minutes.innerText = +minutes.innerText - 1; //desconta 1 min
                    }else{
                        minutes.innerText = '0' + (+minutes.innerText - 1).toString();
                    };

                    //console.log(circle.style.strokeDasharray)
                    seconds.innerText = '59'; //e os segundos passam a 59

                }else{ //00:00
                    //quando os minutos do state atual chegam ao 0,
                    
                    if(pomodoroState.classList.contains('active')){ //se esse ciclo for o do pomodoro,
                        count += 1; //significa que se completou + 1 intervalo de trabalho/sessão pomodoro
                        //console.log(count)
                        pomodoroState.classList.remove('active');
                        
                        if(count !== 4){ //e, se ainda não se completaram 4 sessões
                            shortBreakState.classList.add('active'); //inicia-se um short break

                            minutes.innerText = +shortBreakNumber.innerText >= 10 ? shortBreakNumber.innerText : '0' + shortBreakNumber.innerText; //para evitar escrever outro if/else

                            totalMinutes = +shortBreakNumber.innerText;

                        }else{ //se já, zera-se a count e está na altura de um long break
                            count = 0;
                            longBreakState.classList.add('active');

                            minutes.innerText = +longBreakNumber.innerText >= 10 ? longBreakNumber.innerText : '0' + longBreakNumber.innerText;

                            totalMinutes = +longBreakNumber.innerText;
                        };

                    }else if(shortBreakState.classList.contains('active')){ //short break -> pomodoro
                        shortBreakState.classList.remove('active');
                        pomodoroState.classList.add('active');

                        minutes.innerText = +pomodoroNumber.innerText >= 10 ? pomodoroNumber.innerText : '0' + pomodoroNumber.innerText;

                        totalMinutes = +pomodoroNumber.innerText;

                    }else if(longBreakState.classList.contains('active')){ //long break -> pomodoro
                        longBreakState.classList.remove('active');
                        pomodoroState.classList.add('active');

                        minutes.innerText = +pomodoroNumber.innerText >= 10 ? pomodoroNumber.innerText : '0' + pomodoroNumber.innerText;

                        totalMinutes = +pomodoroNumber.innerText;
                    };

                    //Reset Progress Bar
                    step = 879/totalMinutes;
                    dash = 0;
                    gap = 879;

                    pauseTimer();
                    startTimer();
                };
            };
            
        }, 1000); //de 1 em 1 segundo, executa a função myFunction e guarda o timer ID na variável timerID, o qual vou usar para parar a execução da função quando o relógio atingir os 0 minutos
    };

    //ATENÇÃO: estou, constantemente, a escrever ***.innerText. Isto significa que a JS Engine está constantemente a executar essa instrução. É considerada best practice guardar isso numa variável e usá-la depois. Desta forma, o ***.innerText é executado apenas uma vez e o código é otimizado. Até agora, não me tinha preocupado com estas coisas, mas começa a fazer sentido para mim. Para já, vou manter assim pq me ajuda a entender melhor o meu raciocínio, mas, no próximo projeto vou procurar escrever código mais reutilizável e de rápida execução.

    function pauseTimer(){
        clearInterval(timerId);
    };

    /* (ver linha 127 do index.html)
    console.log(longBreakNumber.innerText);
    console.log('0' + longBreakNumber.innerText);
    console.log(longBreakNumber.innerText.trim());
    console.log('0' + longBreakNumber.innerText.trim());
    */
});
