import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css'
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, {
      week_day: 0,
      from: '',
      to: '',
    }]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });
    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: +cost,
      schedule: scheduleItems,
    })
      .then(() => {
        alert('cadastro realizado com sucesso');
        history.push('/');
      })
      .catch(() => alert('deu ruim'));
    console.log({
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      scheduleItems,
    })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que voce quer dar aulas."
        description="O primeiro passo e preencher esse formulario de inscricao"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome"
              value={name}
              onChange={({target}) => setName(target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={({target}) => setAvatar(target.value)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={({target}) => setWhatsapp(target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={({target}) => setBio(target.value)}
            />
          </fieldset>
          
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              value={subject}
              onChange={({target}) => setSubject(target.value)}
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
            <Input
              name="cost"
              label="Custo da sua hora"
              value={cost}
              onChange={({target}) => setCost(target.value)}
            />
          </fieldset>
          
          <fieldset>
            <legend>
              Horarios disponiveis
              <button
                type="button"
                onClick={addNewScheduleItem}
              >
                + Novo horario
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={index} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={({target}) => setScheduleItemValue(index, 'week_day', target.value)}
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
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={({target}) => setScheduleItemValue(index, 'from', target.value)}
                  />
                  <Input
                    name="to"
                    label="Ate"
                    type="time"
                    value={scheduleItem.to}
                    onChange={({target}) => setScheduleItemValue(index, 'to', target.value)}
                  />
                </div>
              );
            })}

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante"/>
              Importante! <br/>
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;