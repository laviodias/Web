import { useRef, useState } from 'react'

import { result } from '../../../api/api'
import alertImage from '../../assets/Warning.svg'
import * as S from './Form-Style'

async function getCountries() {
  return result()
}

interface ICountry {
  Country: string
  Slug: string
}

interface IProps {
  center?: boolean
  chosenStatus: string | null
  chosenCountry: string | null
}

const countries: ICountry[] = await getCountries()

export default function FormContent({
  center,
  chosenStatus,
  chosenCountry,
}: IProps) {
  const countryRef = useRef<HTMLSelectElement>(null)
  const statusRef = useRef<HTMLSelectElement>(null)
  const [error, setError] = useState(false)

  async function getCases() {
    const country = countryRef.current?.value
    const status = statusRef.current?.value
    if (country === 'Select a country' || status === '') {
      setError(true)
      setInterval(() => {
        setError(false)
      }, 3000)
    } else if (country !== undefined && status !== undefined) {
      localStorage.setItem('country', country)
      localStorage.setItem('status', status)
      window.location.reload()
    }
  }

  function errorBox(message: string) {
    return (
      <S.ErrorBox>
        <div>
          <img src={alertImage} alt="" />
          <p>{message}</p>
        </div>
      </S.ErrorBox>
    )
  }
  return (
    <S.Container>
      <section>
        <div>
          <S.Label>Country</S.Label>
          <select defaultValue={chosenCountry} ref={countryRef}>
            <option>Select a country</option>
            {countries.map(value => {
              return <option value={value.Slug}>{value.Country}</option>
            })}
          </select>
        </div>
        <div>
          <S.Label>Status</S.Label>
          <select defaultValue={chosenStatus} ref={statusRef}>
            <option value="">Select an status</option>
            <option value="confirmedCases">Confirmed</option>
            <option value="deathCases">Deaths</option>
            <option value="recoveredCases">Recovered</option>
          </select>
        </div>
      </section>
      <S.BtnDiv center={center}>
        <button onClick={getCases}>Search</button>
      </S.BtnDiv>

      {error ? errorBox('Select all fields!') : null}
    </S.Container>
  )
}
