import style from '../../scss/components/contact.module.scss';

function Contact() {

  return (
    <div>
        <button className={`btn btn--primary ${style.btnCard}`} type="button">Contact</button>
    </div>
  )
};

export default Contact;
