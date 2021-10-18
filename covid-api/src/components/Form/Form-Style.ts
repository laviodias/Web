import styled from 'styled-components'

interface IProps {
  center?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 850px) {
    align-items: center;
  }

  article {
    display: flex;
    flex-direction: column;

    @media (max-width: 850px) {
      align-items: center;
    }

    @media (max-width: 470px) {
      align-items: flex-start;
    }
  }

  aside {
    @media (max-width: 470px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    @media (max-width: 470px) {
      width: 100%;
    }

    select {
      padding: 12px;
      background-color: #f6f6f6;
      color: #062646;
      font-size: 1.6rem;
      max-width: 45rem;

      @media (max-width: 470px) {
        max-width: 100%;
        margin: 0px 10%;
      }
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  button {
    padding: 15px 93px;
    background-color: #0ec9f9;
    color: white;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.8rem;
    margin-top: 6rem;
    width: max-content;

    @media (max-width: 470px) {
      width: 100%;
    }
  }
`

export const Title = styled.p`
  color: #0ec9f9;
  font-weight: 900;
  font-size: 6.4rem;
  letter-spacing: -3%;
  max-width: 800px;

  @media (max-width: 850px) {
    font-size: 4.5rem;
    text-align: center;
    max-width: 60%;
  }

  @media (max-width: 470px) {
    font-size: 2.4rem;
    max-width: 100%;
    padding: 0px 39px;
    text-align: start;
  }
`

export const Text = styled.p`
  color: #062646;
  font-size: 2.4rem;
  letter-spacing: -3%;
  max-width: 450px;
  margin-top: 4rem;
  margin-bottom: 7.8rem;

  @media (max-width: 850px) {
    font-size: 1.8rem;
    text-align: center;
    max-width: 50%;
  }

  @media (max-width: 470px) {
    font-size: 1.4rem;
    max-width: 209px;
    text-align: start;
    margin-left: 42px;
    margin-bottom: 3.7rem;
  }
`

export const BtnDiv = styled.div`
  display: ${(props: IProps) => (!props.center ? '' : 'flex')};
  justify-content: ${(props: IProps) => (!props.center ? '' : 'center')};

  @media (max-width: 850px) {
    justify-content: center;
  }

  @media (max-width: 470px) {
    padding: 0px 42px;
    width: 100%;
  }
`

export const ErrorBox = styled.label`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;

  div {
    background-color: #d94c2d;
    border-radius: 10px;
    display: flex;
    gap: 16px;
    padding: 8px 16px;
    color: white;
    font-weight: 700;
    width: max-content;
    height: 60px;
    align-items: center;
    font-size: 1.6rem;
  }
`

export const Label = styled.p`
  color: #062646;
  font-weight: 700;
  font-size: 1.4rem;

  @media (max-width: 470px) {
    margin: 0px 10%;
  }
`
