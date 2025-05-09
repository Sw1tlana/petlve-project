import { useSelector } from 'react-redux';
import style from '../../scss/components/_userBlock.module.scss';
import icons from '../../shared/icons/sprite.svg';

import { useForm } from 'react-hook-form';
import { selectUser } from '../../reduce/auth/selectors';
import { useEffect } from 'react';

function UserBlock() {

    const user = useSelector(selectUser); 

  const avatarUrl = user?.avatar
    ? user.avatar.startsWith('http')
      ? `${user.avatar}?t=${Date.now()}`
      : `https://petlve-api.onrender.com${user.avatar}?t=${Date.now()}`
    : null;

  const { register, setValue, formState: { errors } } = useForm({
    mode: 'onTouched'
});

  useEffect(() => {
    if (user) {
      setValue('name', user.name || '');
      setValue('email', user.email || '');
      setValue('phone', user.phone || '');
    }
  }, [user, setValue]);

  return (
  <section>
    <div className={style.containerAvatarInfo}>
          {avatarUrl ? (
              <img className={style.imgAvatar} src={avatarUrl} alt="User avatar" />
          ) : (
            <div className={style.avatar}>
              <svg width={40} height={40} className={style.iconUser}>
                <use xlinkHref={`${icons}#icon-user`} />
              </svg>
            </div>
          )}
      
       <p className={style.textAvatar}>Upload photo</p>
    </div>
    <div className={style.containerInformation}>
         <h3 className={style.titleInformation}>My information</h3>
        <form className={style.formProfile}>
          
          <input
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
  </section>
  )
};

export default UserBlock;
