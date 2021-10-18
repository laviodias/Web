import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    margin: 7.2rem;
    width: 100%;
    height: 1px;
    border-top: 1px solid #e5e5e5;

    @media (max-width: 470px) {
      margin: 5.2rem;
    }
  }
`

export const Country = styled.p`
  font-size: 4.8rem;
  color: #0ec9f9;
  font-weight: 700;
`

export const Cases = styled.p`
  font-size: 3.6rem;
  color: #062646;
  font-weight: 700;
`

export const Status = styled.p`
  color: #bcbcbc;
  font-size: 2.4rem;
  font-weight: 700;
`

export const Skeleton = styled.aside`
  height: 200px;
  width: 100%;
  background-color: #e4e4e4;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 15px;
`

export const SkeletonTitle = styled.aside`
  height: 45px;
  width: 70%;
  background: #eee;
  background: linear-gradient(110deg, #fff 8%, #f5f5f5 18%, #fff 33%);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`

export const SkeletonCases = styled.aside`
  height: 40px;
  width: 40%;
  background: #eee;
  background: linear-gradient(110deg, #fff 8%, #f5f5f5 18%, #fff 33%);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`

export const SkeletonStatus = styled.aside`
  height: 30px;
  width: 50%;
  background: #eee;
  background: linear-gradient(110deg, #fff 8%, #f5f5f5 18%, #fff 33%);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`
