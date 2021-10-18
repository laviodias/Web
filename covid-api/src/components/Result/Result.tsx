import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { casesPerCountry } from '../../../api/api'
import FormContent from '../Form/FormContent'
import * as S from './Result-Style'

interface ICases {
  country: string
  recoveredCases: number
  confirmedCases: number
  deathCases: number
}

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function checkStatus(status: string | null) {
  switch (status) {
    case 'deathCases':
      return 'death cases'
    case 'recoveredCases':
      return 'recovered cases'
    case 'confirmedCases':
      return 'confirmed cases'
    default:
      return ''
  }
}

function numberWithCommas(x: number | undefined) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

async function getCases(country: string) {
  const results: ICases | void = await casesPerCountry(country)
  return results
}

export default function Result() {
  const [cases, setCases] = useState<number | undefined>()
  const [country, setCountry] = useState('')
  const [searchCountry, setSearchCountry] = useState('')
  const [searchStatus, setSearchStatus] = useState('')

  const query = useQuery()
  const receivedCountry = query.get('country')
  const receivedStatus = query.get('status')

  async function checkCases(countryToGet: string, status: string | null) {
    const info = await getCases(countryToGet)
    if (info) setCountry(info.country)
    switch (status) {
      case 'confirmedCases':
        setCases(info?.confirmedCases)
        break
      case 'deathCases':
        setCases(info?.deathCases)
        break
      case 'recoveredCases':
        setCases(info?.recoveredCases)
        break
      default:
        break
    }
  }

  if (
    receivedCountry &&
    (receivedCountry !== searchCountry || receivedStatus !== searchStatus)
  ) {
    setSearchCountry(receivedCountry)
    if (receivedStatus) setSearchStatus(receivedStatus)

    checkCases(receivedCountry, receivedStatus)
  }

  return (
    <div>
      {cases !== undefined ? (
        <S.Container>
          <S.Country>{country}</S.Country>
          <S.Cases>{numberWithCommas(cases)}</S.Cases>
          <S.Status>{checkStatus(query.get('status'))}</S.Status>
          <div />
        </S.Container>
      ) : (
        <S.Container>
          <S.Skeleton>
            <S.SkeletonTitle />
            <S.SkeletonCases />
            <S.SkeletonStatus />
          </S.Skeleton>
          <div />
        </S.Container>
      )}
      <FormContent
        center
        chosenStatus={localStorage.getItem('status')}
        chosenCountry={localStorage.getItem('country')}
      />
    </div>
  )
}
