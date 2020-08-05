import React from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import './styles.css'

function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes sao os proffys disponiveis.">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Materia</label>
            <input id="subject" type="text"/>
          </div>
          <div className="input-block">
            <label htmlFor="week-day">Dia da semana</label>
            <input id="week-day" type="text"/>
          </div>
          <div className="input-block">
            <label htmlFor="time">Hora</label>
            <input id="time" type="text"/>
          </div>
        </form>
      </PageHeader>

      <main>
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </main>
    </div>
  );
}

export default TeacherList;