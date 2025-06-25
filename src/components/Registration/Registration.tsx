import Container from "../../shared/components/Container/Container";
import style from '../../scss/components/_registration.module.scss';
import authCat  from '../../shared/images/Auth/cat@2x.png';
import '../../scss/components/btn/types/_secondary.scss';
import '../../scss/components/btn/types/_primary.scss';
import icons from '../../shared/icons/sprite.svg';
import { signUpSchema } from '../../shemas/signUpShema';
import { formValuesSignUp } from '../../helpers/contacts';
import { signInUser, signUpUser } from "../../reduce/auth/operations";
import type { AppDispatch } from '../../reduce/store';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useId, useState } from "react";
import toast from "react-hot-toast";

interface formData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

function Registration() {
  const dispatch: AppDispatch = useDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const phoneId = useId();

    const { register, watch, handleSubmit, formState: { errors } } = useForm({
       defaultValues: formValuesSignUp,
       resolver: yupResolver(signUpSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data: formData) => {

      try {
        await dispatch(signUpUser(data)).unwrap();

        await dispatch(signInUser({ email: data.email, password: data.password })).unwrap();
        navigate('/current');

      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error('An unknown error occurred');
        }
      }
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState: boolean) => !prevState);
    };

    const passwordValue = watch('password');
    const phoneValue = watch('phone');
    const nameValue = watch('name');
    const emailValue = watch('email');
    
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

                    <div className={style.btnAuth}>
                        <button className="btn btn--primary" type="submit">Registration</button>
                    </div>
                    <Link className={style.linkForm} to="/signup">Don’t have an account? 
                    <span className={style.span}>Register</span></Link>
                </form>
            </div>
          </div>
        </Container>

    </section>
  )
};

export default Registration;
