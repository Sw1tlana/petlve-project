import style from '../../../scss/components/_modalEditInformation.module.scss';
import icons from '../../../shared/icons/sprite.svg';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { AppDispatch } from '../../../reduce/store';
// import { useDispatch } from 'react-redux';
import { useId } from 'react';
import { editInformationSchema } from '../../../shemas/editInformationShema';
import { formValuesEditInform } from '../../../helpers/contacts';

// interface formData {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
// }

function ModalEditInformation() {
  // const dispatch: AppDispatch = useDispatch();

    const nameId = useId();
    const emailId = useId();
    const phoneId = useId();

      const { register, watch, formState: { errors } } = useForm({
         defaultValues: formValuesEditInform,
         resolver: yupResolver(editInformationSchema),
          mode: 'onTouched'
      });

      const phoneValue = watch('phone');
      const nameValue = watch('name');
      const emailValue = watch('email');

          // const onSubmit = (data: formData) => {
          //   dispatch();
          //   reset();
          // };

  return (
    <section className={style.sectionInformation}>
        <h2 className={style.titleInformation}>Edit information</h2>
        <div className={style.avatar}>
            <svg width={44} height={44} className={style.iconAvatar}>
                <use xlinkHref={`${icons}#icon-avatar`} />
            </svg>
        </div>
        <form>
        <div className={style.iconContainerAuth}>
                        <input
                        id={nameId}
                        type="name"
                        className={`input input--secondary ${!errors.name ? style.validName : ''}`}
                        placeholder="Name"
                        {...register('name')}
                        autoComplete="name"
                        aria-required="true"
                        />
                       {typeof errors.name?.message === "string" && 
                       <p className={style.errorMsg}>{errors.name.message}</p>}

                        {!errors.name && nameValue && (
                            <p className={style.successMsg}>Name is valid!</p>
                          )}

                       <div className="iconContainerAuth">
                       {errors.name && nameValue && (
                        <svg 
                          width={16} 
                          height={16} 
                          className={style.iconClose}>
                          <use xlinkHref={`${icons}#icon-close`} />
                        </svg>
                      )}
                      {!errors.name && nameValue && (
                        <svg 
                          width={16} 
                          height={16} 
                          className={style.iconCheck}>
                          <use xlinkHref={`${icons}#icon-check`} />
                        </svg>
                      )}
                      </div>
                    </div>

                      <div className={style.iconContainerAuth}>
                        <input
                        id={emailId}
                        type="email"
                        className={`input input--secondary ${!errors.email ? style.validEmail : ''}`}
                        placeholder="Email"
                        {...register('email')}
                        autoComplete="email"
                        aria-required="true"
                        />
                       {typeof errors.email?.message === "string" && 
                       <p className={style.errorMsg}>{errors.email.message}</p>}

                          {!errors.email && emailValue && (
                            <p className={style.successMsg}>Email is valid!</p>
                          )}

                          {errors.email && emailValue && (
                                <svg 
                                  width={16} 
                                  height={16} 
                                  className={style.iconClose}>
                                  <use xlinkHref={`${icons}#icon-close`} />
                                </svg>
                              )}
                              {!errors.email && emailValue && (
                                <svg 
                                  width={16} 
                                  height={16} 
                                  className={style.iconCheck}>
                                  <use xlinkHref={`${icons}#icon-check`} />
                                </svg>
                              )}
                        </div>
                        <div className={style.iconContainerAuth}>
                          <input
                          id={phoneId}
                           className={`input input--secondary ${!errors.phone && phoneValue ? style.validPhone : ''}`}
                          placeholder="Phone number"
                          {...register('phone')}
                          autoComplete="phone"
                          aria-required="true"
                          />
                       {typeof errors.phone?.message === "string" && 
                       <p className={style.errorMsg}>{errors.phone.message}</p>}

                        {!errors.phone && phoneValue && (
                          <p className={style.successMsg}>Email is valid!</p>
                          )}

                       <div>
                       {errors.phone&& phoneValue && (
                          <svg 
                            width={16} 
                            height={16} 
                            className={style.iconClose}>
                            <use xlinkHref={`${icons}#icon-close`} />
                          </svg>
                        )}
                        {!errors.phone && phoneValue && (
                          <svg 
                            width={16} 
                            height={16} 
                            className={style.iconCheck}>
                            <use xlinkHref={`${icons}#icon-check`} />
                          </svg>
                        )}  
                        </div> 
                    </div>

                    <button 
                        className="btn btn--primary" 
                        type="submit">
                          Go to profile
                    </button>
        </form>
    </section>
  )
};

export default ModalEditInformation;
