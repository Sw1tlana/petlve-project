import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch } from '../../../reduce/store';
import { useDispatch, useSelector } from 'react-redux';
import { useId, useRef } from 'react';
import { editInformationSchema } from '../../../shemas/editInformationShema';
import { userCurrentEdit } from '../../../reduce/auth/operations';
import { selectUser } from '../../../reduce/auth/selectors';
import { User } from '../../../reduce/auth/slice';

type formData = {
  name: string;
  email: string;
  phone: string;
  photoUrl: string | null;
  uploadPhoto: File | null;
};

function ModalEditInformation() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser) as User | null;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const photoUrl = useId();
  const uploadPhoto = useId();

  const { register, watch, reset, setValue, handleSubmit, formState: { errors } } = useForm<formData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      photoUrl: null,
      uploadPhoto: null,
    },
    mode: 'onTouched',
    resolver: yupResolver(editInformationSchema),
  });

  const phoneValue = watch('phone');
  const nameValue = watch('name');
  const emailValue = watch('email');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("uploadPhoto", file, { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<formData> = async (data) => {
    try {
      const { uploadPhoto, ...rest } = data;

      const formDataForSubmit = {
        ...rest,
        photoUrl: rest.photoUrl ?? "",
        uploadPhoto: uploadPhoto ?? new File([], "empty"),
      };

      await dispatch(userCurrentEdit(formDataForSubmit)).unwrap();
      reset();
    } catch (err) {
      console.error('Помилка редагування:', err);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { ref: uploadPhotoRef, ...uploadPhotoRest } = register("uploadPhoto");

  return (
    <section className="sectionInformation">
      <h2 className="titleInformation">Edit information</h2>
      <div className="avatar">
        {user?.avatar ? (
          <img src={user.avatar} alt="User avatar" className="userPhoto" />
        ) : (
          <svg width={44} height={44} className="iconAvatar">
            <use xlinkHref="#icon-avatar" />
          </svg>
        )}
      </div>

      <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
        <div className="containerUpload">
          <div>
            <input
              id={photoUrl}
              type="url"
              className="input input--secondary"
              placeholder="https://ftp.goit.study/img/pets/5.webp"
              {...register("photoUrl")}
              autoComplete="off"
              aria-required="true"
            />
            {errors.photoUrl?.message && (
              <p className="errorMsg">{String(errors.photoUrl.message)}</p>
            )}
          </div>

          <div className="uploadInput">
            <input
              id={uploadPhoto}
              type="file"
              {...uploadPhotoRest}
              ref={(e) => {
                uploadPhotoRef(e);
                fileInputRef.current = e;
              }}
              onChange={handleFileChange}
              aria-required="true"
              style={{ display: "none" }}
            />
            <button
              onClick={handleButtonClick}
              type="button"
              className="input input--secondary"
            >
              <span className="spanBtn">Upload photo</span>
            </button>
            {errors.uploadPhoto?.message && (
              <p className="errorMsg">{String(errors.uploadPhoto.message)}</p>
            )}
            <svg width={20} height={20} className="iconUpload">
              <use xlinkHref="#icon-upload-cloud" />
            </svg>
          </div>
        </div>

        <div className="iconContainerAuth">
          <input
            id={nameId}
            type="text"
            className={`input input--secondary ${!errors.name ? "validName" : ''}`}
            placeholder="Name"
            {...register('name')}
            autoComplete="name"
            aria-required="true"
          />
          {errors.name?.message && (
            <p className="errorMsg">{errors.name.message}</p>
          )}
        </div>

        <div className="iconContainerAuth">
          <input
            id={emailId}
            type="email"
            className={`input input--secondary ${!errors.email ? "validEmail" : ''}`}
            placeholder="Email"
            {...register('email')}
            autoComplete="email"
            aria-required="true"
          />
          {errors.email?.message && (
            <p className="errorMsg">{errors.email.message}</p>
          )}
        </div>

        <div className="iconContainerAuth">
          <input
            id={phoneId}
            className={`input input--secondary ${!errors.phone && phoneValue ? "validPhone" : ''}`}
            placeholder="+380 65 669 12 24"
            {...register('phone')}
            autoComplete="phone"
            aria-required="true"
          />
          {errors.phone?.message && (
            <p className="errorMsg">{errors.phone.message}</p>
          )}
        </div>

        <button className="btn btn--primary" type="submit">
          Go to profile
        </button>
      </form>
    </section>
  );
}

export default ModalEditInformation;
