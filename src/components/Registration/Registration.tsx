import Container from "../../shared/components/Container/Container";
import style from '../../scss/components/_registration.module.scss';
import authCat  from '../../shared/images/Auth/cat@2x.png';
import '../../scss/components/btn/types/_secondary.scss';
import '../../scss/components/btn/types/_primary.scss';
import icons from '../../shared/icons/sprite.svg';
import { signUpSchema } from '../../shemas/signUpShema';
import { formValuesSignUp } from '../../helpers/contacts';
import { signUpUser } from "../../reduce/auth/operations";
import type { AppDispatch } from '../../reduce/store';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useId, useState } from "react";

interface formData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

function Registration() {
  const dispatch: AppDispatch = useDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const phoneId = useId();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
       defaultValues: formValuesSignUp,
       resolver: yupResolver(signUpSchema),
        mode: 'onTouched'
    });

    const onSubmit = (data: formData) => {
      dispatch(signUpUser(data));
      reset();
    }

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState: boolean) => !prevState);
    };
    
  return (
    <section>
        <Container>
          <div className={style.wrapper}>
                <div className={style.containerImg}>

                <div className={style.containerNone}>
                <div className={style.containerAvatar}>
                  <div className={style.avatar}>
                      <svg width={30} height={30} className={style.iconAvatar}>
                        <use xlinkHref={`${icons}#icon-avatar`} />
                      </svg>
                    </div>
                  <div>
                  <div className={style.containerInfo}>
                    <h3 className={style.name}>Jack</h3>
                    <p className={style.data}>Birthday: 18.10.2021</p>
                  </div>
                    <p className={style.description}>
                        Jack is a gray Persian cat with green eyes. 
                        He loves to be pampered and groomed, 
                        and enjoys playing with toys.
                    </p>
                  </div>
                  </div>
              </div>
                  <img className={style.imgAuth} src={authCat} alt="cat"/>
                </div>

            <div className={style.containerForm}>
                <h3 className={style.titleForm}>
                   Registration
                </h3>
                <p className={style.textForm}>
                    Thank you for your interest in our platform. 
                </p>
                <form className={style.formAuth} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.iconContainerAuth}>
                        <input
                        id={nameId}
                        type="name"
                        className="input input--secondary"
                        placeholder="Name"
                        {...register('name')}
                        autoComplete="name"
                        aria-required="true"
                        />
                       {typeof errors.name?.message === "string" && 
                       <p className={style.errorMsg}>{errors.name.message}</p>}

                       <div className="iconContainerAuth">
                        <svg width={16} height={16} className={style.iconClose}>
                          <use xlinkHref={`${icons}#icon-close`} />
                        </svg>
                        <svg width={16} height={16} className={style.iconCheck}>
                          <use xlinkHref={`${icons}#icon-check`} />
                        </svg>
                      </div>
                    </div>

                      <div className={style.iconContainerAuth}>
                        <input
                        id={emailId}
                        type="email"
                        className="input input--secondary"
                        placeholder="Email"
                        {...register('email')}
                        autoComplete="email"
                        aria-required="true"
                        />
                       {typeof errors.email?.message === "string" && 
                       <p className={style.errorMsg}>{errors.email.message}</p>}
                        <svg width={16} height={16} className={style.iconClose}>
                          <use xlinkHref={`${icons}#icon-close`} />
                        </svg>
                        <svg width={16} height={16} className={style.iconCheck}>
                          <use xlinkHref={`${icons}#icon-check`} />
                        </svg>
                    </div>

                    <div className={style.iconContainerAuth}>
                        <input
                            id={passwordId}
                            type={isPasswordVisible ? "text" : "password"}
                            className={`input input--secondary ${!errors.password ? style.validPassword : ''}`}
                            placeholder="Password"
                            {...register('password')}
                            autoComplete="current-password"
                            aria-required="true"
                        />
                       {typeof errors.password?.message === "string" && 
                       <p className={style.errorMsg}>{errors.password.message}</p>}
                       <div>
                       {isPasswordVisible ? (
                          <svg 
                            width={16} height={16} 
                            className={style.iconEyeOff} 
                            onClick={togglePasswordVisibility}>
                            <use xlinkHref={`${icons}#icon-eye`} />
                          </svg>
                        ) : (
                          <svg 
                            width={16} height={16} 
                            className={style.iconEye} 
                            onClick={togglePasswordVisibility}>
                            <use xlinkHref={`${icons}#icon-eye-off`} />
                          </svg>
                        )}
                          {errors.password ? (
                            <svg width={16} height={16} className={`${style.iconClose} ${errors.password ? '' : style.hidden}`}>
                              <use xlinkHref={`${icons}#icon-close`} />
                            </svg>
                          ) : (
                            <svg width={16} height={16} className={`${style.iconCheck} ${!errors.password ? '' : style.hidden}`}>
                              <use xlinkHref={`${icons}#icon-check`} />
                            </svg>
                          )}
                        </div>
                    </div>

                    <div className={style.iconContainerAuth}>
                          <input
                          id={phoneId}
                          className="input input--secondary"
                          placeholder="Phone number"
                          {...register('phone')}
                          aria-required="true"
                          />
                       {typeof errors.phone?.message === "string" && 
                       <p className={style.errorMsg}>{errors.phone.message}</p>}
                       <div>
                        <svg width={16} height={16} className={style.iconClose}>
                          <use xlinkHref={`${icons}#icon-close`} />
                        </svg>
                        <svg width={16} height={16} className={style.iconCheck}>
                          <use xlinkHref={`${icons}#icon-check`} />
                        </svg>
                      </div>
                    </div>

                    <div className={style.btnAuth}>
                        <button className="btn btn--primary" type="submit">Registration</button>
                    </div>
                    <Link className={style.linkForm} to="/register">Don’t have an account? 
                    <span className={style.span}>Register</span></Link>
                </form>
            </div>
          </div>
        </Container>

    </section>
  )
};

export default Registration;
