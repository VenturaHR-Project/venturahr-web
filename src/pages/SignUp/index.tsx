import React, { FormEvent, useState } from 'react';
import Swal from 'sweetalert2';
import warningIcon from '../../assets/images/icons/warning.svg';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import { Firebase } from '../../services/Firebase/Firebase';
import { IFirebase } from '../../services/Firebase/IFirebase';
import userAPI from '../../services/UserAPI';
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

  async function handleCreateUser(event: FormEvent) {
    event.preventDefault()

    const firebase: IFirebase = new Firebase()
    let uid: string | void = undefined

    try {
      uid = await firebase.registerUserWithEmailAndPassword(email, password)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erro no cadastro!',
        text: `${err}`,
        showConfirmButton: true
      })
    }

    if (uid) {
      userAPI.post("/users", {
        uid, name, accountType, phone, address, cpf
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado com sucesso!',
          showConfirmButton: false,
          timer: 1700
        })
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Erro no cadastro!',
          showConfirmButton: false,
          timer: 1700
        })
      })
    }
  }

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
        <form onSubmit={handleCreateUser}>
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
                //{ value: 'Company', label: 'Empresa' },
              ]}
            />
            {accountType == 'Candidate' ? inputCpf() : inputCnpjAndCorporateName()}
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