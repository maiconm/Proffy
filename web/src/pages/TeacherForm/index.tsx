import React from 'react';
import PageHeader from '../../components/PageHeader';

import './styles.css'
import Input from '../../components/Input';

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
        </fieldset>
        
        <fieldset>
          <legend>Sobre a aula</legend>
          <Input name="subject" label="Materia"/>
          <Input name="cost" label="Custo da sua hora"/>
        </fieldset>
      </main>
    </div>
  );
}

export default TeacherForm;