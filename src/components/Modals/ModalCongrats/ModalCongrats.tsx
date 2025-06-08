import style from '../../../scss/components/_modalCongrats.module.scss';
import icons from '../../../shared/icons/sprite.svg';

function ModalCongrats() {
  return (
    <div className={style.modalCongrats}>
            {watch("uploadPhoto") instanceof File ? (
              <img
                className={style.userPhoto}
                src={URL.createObjectURL(watch("uploadPhoto")!)}
                alt="Selected preview"
              />
            ) : photoUrlValue ? (
              <img
                className={style.userPhoto}
                src={`${photoUrlValue}?t=${Date.now()}`}
                alt="URL preview"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <div className={style.addPetAvatar}>
                <svg width={26} height={26} className={style.iconPaw}>
                  <use xlinkHref={`${icons}#icon-paw`} />
                </svg>
              </div>
            )}
    </div>
  )
};

export default ModalCongrats;

