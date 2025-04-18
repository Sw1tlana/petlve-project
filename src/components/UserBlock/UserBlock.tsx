import style from '../../scss/components/_userBlock.module.scss';
import icons from '../../shared/icons/sprite.svg';

import { useForm } from 'react-hook-form';

function UserBlock() {

  const { register, formState: { errors } } = useForm({
    mode: 'onTouched'
});

  return (
  <div>
    <div className={style.containerAvatarInfo}>
       <div className={style.avatar}>
            <svg width={40} height={40} className={style.iconUser}>
                <use xlinkHref={`${icons}#icon-user`} />
            </svg>
       </div>
       <p className={style.textAvatar}>Upload photo</p>
    </div>
    <div className={style.containerInformation}>
         <h3 className={style.titleInformation}>My information</h3>
        <form className={style.formProfile}>
          
          <input
                 // id={namedId}
                type="name"
                className="input input--secondary"
                placeholder="Name"
                {...register('name')}
                autoComplete="name"
                aria-required="true"
                  />
                {typeof errors.name?.message === "string" && 
                <p className={style.errorMsg}>{errors.name.message}</p>}

          <input
                // id={emailId}
                type="email"
                className="input input--secondary"
                placeholder="Email"
                {...register('email')}
                autoComplete="email"
                aria-required="true"
                  />
                {typeof errors.email?.message === "string" && 
                <p className={style.errorMsg}>{errors.email.message}</p>}

          <input
                // id={emailId}
                type="phone"
                className="input input--secondary"
                placeholder="+380"
                {...register('phone')}
                autoComplete="phone"
                aria-required="true"
                  />
                {typeof errors.phone?.message === "string" && 
                <p className={style.errorMsg}>{errors.phone.message}</p>}
         </form>
    </div>
  </div>
  )
};

export default UserBlock;
