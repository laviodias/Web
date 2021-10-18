const BASE_URL = 'https://api.covid19api.com'

interface IResult {
  Country: string
  Slug: string
  ISO2: string
}

interface ICases {
  country: string
  recoveredCases: number
  confirmedCases: number
  deathCases: number
}

const countries: IResult[] = []
let recoveredCases = 0
let confirmedCases = 0
let deathCases = 0
const date = new Date()
let yesterday = `${date.getFullYear()}-${Number(date.getMonth() + 1)}-${Number(
  date.getDate() - 1
)}`
if (date.getDate() === 1) {
  yesterday = `${date.getFullYear()}-${Number(
    date.getMonth()
  )}-${date.getDate()}`
}

export const result = async () =>
  fetch(`${BASE_URL}/countries`)
    .then(resp => resp.json())
    .then(data => {
      data.map((value: IResult) => countries.push(value))

      // Sort by country name
      return countries.sort((a, b) => (a.Country > b.Country ? 1 : -1))
    })

export const casesPerCountry = async (country: string) =>
  fetch(
    `${BASE_URL}/live/country/${country}/status/confirmed/date/${yesterday}`
  )
    .then(resp => {
      if (!resp.ok) throw new Error('Erro ao executar requisição')
      return resp.json()
    })
    .then(data => {
      recoveredCases = 0
      confirmedCases = 0
      deathCases = 0

      data.map((value: any) => {
        recoveredCases += value.Active
        confirmedCases += value.Confirmed
        deathCases += value.Deaths
        country = value.Country
      })
      const submit: ICases = {
        country,
        recoveredCases,
        confirmedCases,
        deathCases,
      }

      return submit
    })
    .catch(error => {
      console.error(error)
    })
