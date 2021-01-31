
function generateTables() {

    // Definindo a div "matchTables" como visivel
    document.getElementById("matchTables").style["visibility"] = "visible";
    
    // Capturando o que foi digitado no textArea
    let inputVal = document.getElementById("textAreaForm").value;

    // A cada ponto e virgula (;) ou nova linha (\n), separa um novo elemento em um array
    let fields = inputVal.split(/[\n,;]/) ; 

    // Declarando os array de times e estados
    let team = [], state = [];

    // Atribuindo os times e estados que foram informados
    for (let i = 0; i < fields.length; i+=2) {
        team.push(fields[i]);
        state.push(fields[i+1]);
    }

    // Declarando das linhas para as tabelas de jogo de ida e de returno
    let matchTeamIda1 = [], matchTeamIda2 = [], matchStateIda = [], matchRoundIda = [];
    let matchTeamReturno1 = [], matchTeamReturno2 = [], matchStateReturno = [], matchRoundReturno = [];

    // Gerando todas as combinações de times possiveis, assim como o estado de cada jogo
    for (let i = 0; i < team.length - 1; i++) {
        for (let j = i + 1; j < team.length; j++) {
            // Verificando se time a ser inserido esta vazio
            if (team[i] != "" && team[j] != "") {
                // Jogos de ida
                matchTeamIda1.push(team[i]);
                matchTeamIda2.push(team[j]);
                matchStateIda.push(state[i]);

                // Jogos de returno
                matchTeamReturno1.push(team[j]);
                matchTeamReturno2.push(team[i]);
                matchStateReturno.push(state[j]);
            }
        }
    }

    // Gerando o valor de rodada para cada linha
    for (let i = 0; i <= matchTeamIda1.length - 1; i++) {
        let valor1 = matchTeamIda1[i], valor2 = matchTeamIda2[i], cont1 = 0, cont2 = 0;
        for (let j = 0; j <= i; j++) {
            if (valor1 === matchTeamIda1[j] || valor1 === matchTeamIda2[j]) {
                cont1++;
            }
            if (valor2 === matchTeamIda1[j] || valor2 === matchTeamIda2[j]) {
                cont2++;
            }
        }
        if (cont1 > cont2) {
            matchRoundIda[i] = cont1;
            matchRoundReturno[i] = cont1;
        } else {
            matchRoundIda[i] = cont2;
            matchRoundReturno[i] = cont2;
        }
    }
    
    // Declarando array com os possiveis valores de pontuação
    const possibleResults = [0, 1, 3];

    // Declarando os arrays de pontos, partidas ganhas, partidas perdidas e partidas com empate para cada time
    let matchPoint = [], matchWon = [], matchLost = [], matchTied = [];

    // Inicializando estes array com 0
    for (i = 0; i < team.length; i++) {
        matchPoint.push(0);
        matchWon.push(0);
        matchLost.push(0);
        matchTied.push(0);
    }

    // Gerando pontuação de forma aleatorias para as paritdas dos jogos de ida
    for (i = 0; i < (matchTeamIda1.length); i++) {
        // Gerando um pontuação aleatoria
        let result = Math.floor(Math.random() * possibleResults.length);

        // Verificando se o time 1 perdeu o jogo
        if (possibleResults[result] === 0) {
            matchLost[team.indexOf(matchTeamIda1[i])]++;
            matchWon[team.indexOf(matchTeamIda2[i])]++;
            matchPoint[team.indexOf(matchTeamIda1[i])] += 0;
            matchPoint[team.indexOf(matchTeamIda2[i])] += 3;
        // Verificando se foi empate
        } else if (possibleResults[result] === 1) {
            matchTied[team.indexOf(matchTeamIda1[i])]++;
            matchTied[team.indexOf(matchTeamIda2[i])]++;
            matchPoint[team.indexOf(matchTeamIda1[i])] += 1;
            matchPoint[team.indexOf(matchTeamIda2[i])] += 1;
        // Verificando se o time 1 ganhou o jogo
        } else {
            matchWon[team.indexOf(matchTeamIda1[i])]++;
            matchLost[team.indexOf(matchTeamIda2[i])]++;
            matchPoint[team.indexOf(matchTeamIda1[i])] += 3;
            matchPoint[team.indexOf(matchTeamIda2[i])] += 0;
        }
    }

    // Gerando pontuação de forma aleatorias para as paritdas dos jogos de returno
    for (i = 0; i < (matchTeamReturno1.length); i++) {
        // Gerando um pontuação aleatoria
        let result = Math.floor(Math.random() * possibleResults.length);

        // Verificando se o time 1 perdeu o jogo
        if (possibleResults[result] === 0) {
            matchLost[team.indexOf(matchTeamReturno1[i])]++;
            matchWon[team.indexOf(matchTeamReturno2[i])]++;
            matchPoint[team.indexOf(matchTeamReturno1[i])] += 0;
            matchPoint[team.indexOf(matchTeamReturno2[i])] += 3;
        // Verificando se foi empate
        } else if (possibleResults[result] === 1) {
            matchTied[team.indexOf(matchTeamReturno1[i])]++;
            matchTied[team.indexOf(matchTeamReturno2[i])]++;
            matchPoint[team.indexOf(matchTeamReturno1[i])] += 1;
            matchPoint[team.indexOf(matchTeamReturno2[i])] += 1;
        // Verificando se o time 1 ganhou o jogo
        } else {
            matchWon[team.indexOf(matchTeamReturno1[i])]++;
            matchLost[team.indexOf(matchTeamReturno2[i])]++;
            matchPoint[team.indexOf(matchTeamReturno1[i])] += 3;
            matchPoint[team.indexOf(matchTeamReturno2[i])] += 0;
        }
    }

    // Recebendo os elementos das tabelas, mantendo a referencia de seus cabeçalhos
    let matchTableIda = document.getElementById("matchTableIda").getElementsByTagName('tbody')[0];
    let matchTableReturno = document.getElementById("matchTableReturno").getElementsByTagName('tbody')[0];
    let matchTableResults = document.getElementById("matchTableResults").getElementsByTagName('tbody')[0];

    // Limpando todas as linhas das tabelas capturadas
    matchTableIda.innerHTML = "";
    matchTableReturno.innerHTML = "";
    matchTableResults.innerHTML = "";

    // Inserindo as linhas e colunas das tabelas de jogo de ida e de returno
    for (i = 0; i < matchTeamIda1.length; i++) {
        // Tabela jogos de ida
        let row = matchTableIda.insertRow(-1);

        let team1 = row.insertCell(0);
        let team2 = row.insertCell(1);
        let state = row.insertCell(2);
        let round = row.insertCell(3);

        team1.innerHTML = matchTeamIda1[i];
        team2.innerHTML = matchTeamIda2[i];
        state.innerHTML = matchStateIda[i];
        round.innerHTML = matchRoundIda[i];

        // Tabela jogos de returno
        row = matchTableReturno.insertRow(-1);

        team1 = row.insertCell(0);
        team2 = row.insertCell(1);
        state = row.insertCell(2);
        round = row.insertCell(3);

        team1.innerHTML = matchTeamReturno1[i];
        team2.innerHTML = matchTeamReturno2[i];
        state.innerHTML = matchStateReturno[i];
        round.innerHTML = matchRoundReturno[i];
    }

    // Inserindo as linhas e colunas da tabelas de placar
    for (i = 0; i < team.length; i++) {
        // Verificando se time a ser inserido esta vazio
        if (team[i] != "") {
            // Tabela placar
            row = matchTableResults.insertRow(-1);

            let teams = row.insertCell(0);
            let won = row.insertCell(1);
            let lost = row.insertCell(2);
            let tied = row.insertCell(3);
            let point = row.insertCell(4);

            teams.innerHTML = team[i];
            won.innerHTML = matchWon[i];
            lost.innerHTML = matchLost[i];
            tied.innerHTML = matchTied[i];
            point.innerHTML = matchPoint[i];
        }
    }
}