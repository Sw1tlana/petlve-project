import Container from "../../shared/components/Container/Container";
import style from '../../scss/components/_login.module.scss';
import loginDog  from '../../shared/images/Auth/dog@2x.png';
import '../../scss/components/btn/types/_secondary.scss';
import icons from '../../shared/icons/sprite.svg';

import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";


function Login() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onTouched'
    });

    const onSubmit = () => {
      reset();
    }

  return (
    <section>
        <Container>
          <div className={style.wrapper}>
            <div className={style.containerLogin}>
                <div className={style.containerImg}>
                   <img className={style.imgLogin} src={loginDog} alt="dog"/>
              </div>
            </div>
            <div className={style.containerForm}>
                <h3 className={style.titleForm}>
                   Log in
                </h3>
                <p className={style.textForm}>
                  Welcome! Please enter your credentials to login to the platform:
                </p>
                <form className={style.formLogin} onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <input
                        // id={emailId}
                        type="email"
                        className="input input--secondary"
                        placeholder="Email"
                        {...register('email')}
                        aria-required="true"
                        />
                       {typeof errors.username?.message === "string" && 
                       <p className={style.errorMsg}>{errors.username.message}</p>}
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-eye`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-eye-off`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-close`} />
                      </svg>
                    </div>

                    <div>
                        <input
                        // id={passwordId}
                        type="password"
                        className="input input--secondary"
                        placeholder="Password"
                        {...register('password')}
                        aria-required="true"
                        />
                       {typeof errors.username?.message === "string" && 
                       <p className={style.errorMsg}>{errors.username.message}</p>}
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-eye`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-eye-off`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-close`} />
                      </svg>
                    </div>
                    <div className={style.buttonLogin}>
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
