import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  fsairlinesId: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await authRegister(data.username, data.email, data.password, data.fsairlinesId);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error (e.g., show error message)
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            {...register('username', { required: 'Este campo es requerido' })}
            className="w-full p-2 border rounded"
          />
          {errors.username && <span className="text-red-500">{errors.username.message}</span>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Correo electrónico</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Este campo es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Correo electrónico inválido' } })}
            className="w-full p-2 border rounded"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Contraseña</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Este campo es requerido', minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } })}
            className="w-full p-2 border rounded"
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="fsairlinesId" className="block mb-1">ID de FSAirlines</label>
          <input
            id="fsairlinesId"
            type="text"
            {...register('fsairlinesId', { required: 'Este campo es requerido' })}
            className="w-full p-2 border rounded"
          />
          {errors.fsairlinesId && <span className="text-red-500">{errors.fsairlinesId.message}</span>}
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;