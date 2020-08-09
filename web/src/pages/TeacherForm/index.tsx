import React from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css'

function TeacherForm() {
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que voce quer dar aulas."
        description="O primeiro passo e preencher esse formulario de inscricao"
      />

      <main>
        <fieldset>
          <legend>Seus dados</legend>
          <Input name="name" label="Nome"/>
          <Input name="avatar" label="Avatar"/>
          <Input name="whatsapp" label="Whatsapp"/>
          <Textarea name="bio" label="Biografia" />
        </fieldset>
        
        <fieldset>
          <legend>Sobre a aula</legend>
          <Select
            name="subject"
            label="Materia"
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciencias', label: 'Ciencias' },
              { value: 'Educacao fisica', label: 'Educacao fisica' },
              { value: 'Fisica', label: 'Fisica' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Historia', label: 'Historia' },
              { value: 'Quimica', label: 'Quimica' },
              { value: 'Matematica', label: 'Matematica' },
              { value: 'Portugues', label: 'Portugues' },
              { value: 'Ingles', label: 'Ingles' },
            ]}
          />
          <Input name="cost" label="Custo da sua hora"/>
        </fieldset>
        
        <fieldset>
          <legend>
            Horarios disponiveis
            <button type="button">
              + Novo horario
            </button>
          </legend>

          <div className="schedule-item">
            <Select
              name="week_day"
              label="Dia da semana"
              options={[
                { value: '0', label: 'Domingo' },
                { value: '1', label: 'Segunda-feira' },
                { value: '2', label: 'Terca-feira' },
                { value: '3', label: 'Quarta-feira' },
                { value: '4', label: 'Quinta-feira' },
                { value: '5', label: 'Sexta-feira' },
                { value: '6', label: 'Sabado' },
              ]}
            />
            <Input name="from" label="Das" type="time"/>
            <Input name="to" label="Ate" type="time"/>
          </div>
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante"/>
            Importante! <br/>
            Preencha todos os dados
          </p>
          <button type="button">
            Salvar cadastro
          </button>
        </footer>
      </main>
    </div>
  );
}

export default TeacherForm;