import Container from "../../shared/components/Container/Container";
import style from '../../scss/components/_login.module.scss';
import authDog  from '../../shared/images/Auth/dog@2x.png';
import '../../scss/components/btn/types/_secondary.scss';
import '../../scss/components/btn/types/_primary.scss';
import icons from '../../shared/icons/sprite.svg';
import { signInSchema } from "../../shemas/signInShema";
import { signInUser } from "../../reduce/auth/operations";
import { formValuesSignIn } from "../../helpers/contacts";
import { AppDispatch } from '../../reduce/store';

import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { useId, useState } from 'react';
import { useDispatch } from "react-redux";

interface formDataResponse {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useDispatch<AppDispatch>();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: formValuesSignIn,
        resolver: yupResolver(signInSchema),
        mode: 'onTouched'
    });

    const emailId = useId();
    const passwordId = useId();

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState: boolean) => !prevState);
    };

    const onSubmit = (formData: formDataResponse) => {
      dispatch(signInUser(formData));
      reset();
    }

    const emailValue = watch('email');
    const passwordValue = watch('password');

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
                    <h3 className={style.name}>Rich</h3>
                    <p className={style.data}>Birthday: 21.09.2020</p>
                  </div>
                    <p className={style.description}>
                      Rich would be the perfect addition to an active family 
                      that loves to play and go on walks. I bet he would love 
                      having a doggy playmate too!
                    </p>
                  </div>
                  </div>
              </div>
                  <img className={style.imgAuth} src={authDog} alt="dog"/>
                </div>

            <div className={style.containerForm}>
                <h3 className={style.titleForm}>
                   Log in
                </h3>
                <p className={style.textForm}>
                  Welcome! Please enter your credentials to login to the platform:
                </p>
                <form className={style.formAuth} onSubmit={handleSubmit(onSubmit)}>
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
                          id={passwordId}
                          type={isPasswordVisible ? 'text' : 'password'}
                          className={`input input--secondary ${!errors.password ? style.validPassword : ''}`}
                          placeholder="Password"
                          {...register('password')}
                          autoComplete="current-password"
                          aria-required="true"
                        />
                       {typeof errors.password?.message === "string" && 
                       <p className={style.errorMsg}>{errors.password.message}</p>}

                      {!errors.password && passwordValue && (
                          <p className={style.successMsg}>Password is valid!</p>
                          )}
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

                          {errors.password && passwordValue && (
                                <svg 
                                  width={16} 
                                  height={16} 
                                  className={style.iconClose}>
                                  <use xlinkHref={`${icons}#icon-close`} />
                                </svg>
                              )}
                              {!errors.password && passwordValue && (
                                <svg 
                                  width={16} 
                                  height={16} 
                                  className={style.iconCheck}>
                                  <use xlinkHref={`${icons}#icon-check`} />
                                </svg>
                              )}   
                    </div>
                    <div className={style.buttonAuth}>
                        <button className="btn btn--primary" type="submit">Log In</button>
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

export default Login;
