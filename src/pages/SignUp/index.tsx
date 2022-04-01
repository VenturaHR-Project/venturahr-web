import React, { useState } from 'react';
import warningIcon from '../../assets/images/icons/warning.svg';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import './styles.css';

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [accountType, setAccountType] = useState('Candidate')
  const [cpf, setCpf] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [corporateName, setCorporateName] = useState('')

  function inputCpf() {
    return (
      <Input
        name="input-cpf"
        label="CPF"
        required
        value={cpf}
        onChange={event => setCpf(event.target.value)}
      />
    )
  }

  function inputCnpjAndCorporateName() {
    return (
      <>
        <Input
          name="input-cnpj"
          label="CNPJ"
          required
          value={cnpj}
          onChange={event => setCnpj(event.target.value)}
        />

        <Input
          name="input-cnpj"
          label="CNPJ"
          required
          value={cnpj}
          onChange={event => setCnpj(event.target.value)}
        />
      </>
    )
  }

  return (
    <div id="page-place-form" className="container">
      <PageHeader
        pageTitle="Cadastrar Lugar"
        title="Cadastre um lugar na plataforma"
        description="O primeiro passo é preencher esse formulário de cadastro"
      />

      <main>
        <form onSubmit={() => { }}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="input-name"
              label="Nome"
              required
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <Input
              name="input-email"
              label="E-mail"
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <Input
              name="input-password"
              label="Senha"
              required
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <Input
              name="input-phone"
              label="Celular"
              required
              value={phone}
              onChange={event => setPhone(event.target.value)}
            />
            <Input
              name="input-address"
              label="Endereço"
              required
              value={address}
              onChange={event => setAddress(event.target.value)}
            />
            <Select
              name="select-account-type"
              label="Tipo de conta"
              required
              value={accountType}
              onChange={event => setAccountType(event.target.value)}
              options={[
                { value: 'Candidate', label: 'Candidato' },
                { value: 'Company', label: 'Empresa' },
              ]}
            />
            { accountType == 'Candidate' ? inputCpf() : inputCnpjAndCorporateName() }
            <Input
              name="input-corporate-name"
              label="Razão Social"
              required
              value={corporateName}
              onChange={event => setCorporateName(event.target.value)}
            />
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default SignUp