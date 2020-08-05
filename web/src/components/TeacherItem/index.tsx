import React from 'react';

import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars1.githubusercontent.com/u/36269699?s=460&v=4" alt="Maicon"/>
        <strong>Maicon</strong>
        <span>Quimica</span>
      </header>
      
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam modi delectus assumenda fugiat dolores, vitae quaerat ullam similique pariatur corporis ipsum eligendi necessitatibus incidunt repudiandae dolorem nisi iusto? Quisquam, tempora?
        <br/><br/>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus ipsum veritatis sint quae tempora culpa voluptate cupiditate architecto sapiente fugit! Ex dolore aspernatur unde rem repudiandae ab, temporibus eveniet totam?
      </p>

      <footer>
        <p>Preco/hora</p>
        <strong>R$80.00</strong>
        <button type="button">
          <img src={whatsappIcon} alt="WhatsApp"/>
          Entrar em contato
        </button>
      </footer>

    </article>
  )
}

export default TeacherItem;