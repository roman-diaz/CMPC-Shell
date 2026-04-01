import React, { FormEvent, ChangeEvent } from 'react';

import content from '../content/login.json';
import { useLoginForm } from '../hooks/useLoginForm.ts';

export default function LoginFieldsForm() {
  const { email, setEmail, password, setPassword, isValid, isSubmitting, error, submit } =
    useLoginForm();

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        void submit();
      }}
      className="flex flex-col gap-4"
    >
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-900">
          Correo electrónico <span className="text-red-600">*</span>
        </label>
        <input
          placeholder={content.emailPlaceholder ?? 'Email'}
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-900">
          Contraseña <span className="text-red-600">*</span>
        </label>
        <input
          placeholder={content.passwordPlaceholder ?? 'Password'}
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed mt-2 transition-colors"
      >
        {isSubmitting ? 'Entrando…' : (content.cta ?? 'Entrar')}
      </button>

      <button
        type="button"
        className="text-sm text-gray-700 underline underline-offset-4"
        onClick={() => { }}
      >
        Olvidé mi contraseña
      </button>
    </form>
  );
}
