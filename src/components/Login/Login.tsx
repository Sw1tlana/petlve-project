import Container from "../../shared/components/Container/Container";
import style from '../../scss/components/_login.module.scss';
import loginDog  from '../../shared/images/Auth/dog@2x.png';

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
            <div className={style.containerLogin}>
                <div className={style.containerImg}>
                   <img className={style.img} src={loginDog} alt="dog"/>
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
                        className={style.formInput}
                        placeholder="Email"
                        {...register('email')}
                        aria-required="true"
                        />
                       {typeof errors.username?.message === "string" && 
                       <p className={style.errorMsg}>{errors.username.message}</p>}
                    </div>

                    <div>
                        <input
                        // id={passwordId}
                        type="password"
                        className={style.formInput}
                        placeholder="Password"
                        {...register('password')}
                        aria-required="true"
                        />
                       {typeof errors.username?.message === "string" && 
                       <p className={style.errorMsg}>{errors.username.message}</p>}
                    </div>
                    <button className={style.loginBtn} type="submit">Log In</button>
                    <Link className={style.textForm} to="/register">Don’t have an account? <span>Register</span></Link>
                </form>
            </div>
        </Container>

    </section>
  )
};

export default Login;
