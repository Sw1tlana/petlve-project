import style from '../../../scss/components/_modalApproveAction.module.scss';
import icons from '../../../shared/icons/sprite.svg';

function ModalApproveAction() {

  return (
    <section className={style.containerModal}>

        <div className={style.avatar}>
            <svg width={44} height={44} className={style.iconAvatar}>
                <use xlinkHref={`${icons}#icon-avatar`} />
            </svg>
        </div>

        <h2 className={style.textModal}>Already leaving?</h2>
        
        <div className={style.containerBtn}>
           <button
            className={`btn btn--primary ${style.btnModalLogout}`} 
                type="button">
                 Yes
            </button>
           <button
            className={`btn btn--primary ${style.btnModalLogout}`}  
                type='button'>
                    Cancel
            </button>
        </div>
    </section>
  )
};

export default ModalApproveAction;
