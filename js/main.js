{
    let form = document.getElementById('f1Form')

    async function handleSubmit(e){
        e.preventDefault()
        let inputSeason = e.target.inputSeason.value
        let inputRound = e.target.inputRound.value

        let f1 = await getSeasonRoundInfo(inputSeason, inputRound)
        inputSeason.value = ''
        inputRound.value = ''

        buildF1Card(f1)
    }
    async function getSeasonRoundInfo(season, round){
        let res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverstandings.json`)
        let data = await res.json()
        return data['MRData']['StandingsTable']
    }


    function buildF1Table(f1){
        let table = document.createElement('table')
        table.className = 'table'
        
        let thead = document.createElement('thead')

        let trHead = document.createElement('tr')

        let position = document.createElement('th')
        position.scope = 'col'
        position.innerHTML = 'Position'

        let points = document.createElement('th')
        points.scope = 'col'
        points.innerHTML = 'Points'

        let name = document.createElement('th')
        name.scope = 'col'
        name.innerHTML = 'Name'

        let nationality = document.createElement('th')
        nationality.scope = 'col'
        nationality.innerHTML = 'Nationality'

        let constructor = document.createElement('th')
        constructor.scope = 'col'
        constructor.innerHTML = 'Constractor'

        let tbody = document.createElement('tbody')

        for (driver in f1.StandingsLists[0].DriverStandings){
            let tr = document.createElement('tr')

            let thPosition = document.createElement('th')
            thPosition.scope = 'row'
            thPosition.innerHTML = f1.StandingsLists[0].DriverStandings[driver].position

            let tdPoints = document.createElement('td')
            tdPoints.innerHTML = f1.StandingsLists[0].DriverStandings[driver].points

            let tdName = document.createElement('td')
            tdName.innerHTML = `${f1.StandingsLists[0].DriverStandings[driver].Driver.givenName} ${f1.StandingsLists[0].DriverStandings[driver].Driver.familyName}`

            let tdNationality = document.createElement('td')
            tdNationality.innerHTML = f1.StandingsLists[0].DriverStandings[driver].Driver.nationality

            let tdConstructor = document.createElement('td')
            tdConstructor.innerHTML = f1.StandingsLists[0].DriverStandings[driver].Constructors[0].name

            tr.append(thPosition)
            tr.append(tdPoints)
            tr.append(tdName)
            tr.append(tdNationality)
            tr.append(tdConstructor)
            tbody.append(tr)
        }

        thead.append(trHead)
        trHead.append(position)
        trHead.append(points)
        trHead.append(name)
        trHead.append(nationality)
        trHead.append(constructor)

        table.append(thead)
        table.append(tbody)

        let display = document.getElementById('standingTable')
        display.innerHTML = ''
        display.append(table)
    }

    form.addEventListener('submit', handleSubmit)
}

// I used a lot of classmates help and online for this assigment 