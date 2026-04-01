import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginApi } from '@/api/auth.api.ts';
import { useAuthStore } from '@/store/auth.store.ts';

export function useLoginForm() {
  const navigate = useNavigate();
  const loginStore = useAuthStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(() => {
    return email.trim().length > 0 && password.trim().length > 0;
  }, [email, password]);

  const submit = async () => {
    if (!isValid || isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const session = await loginApi('');
      loginStore(session);
      navigate('/tasks', { replace: true });
    } catch {
      setError('Credenciales inválidas');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isValid,
    isSubmitting,
    error,
    submit,
  };
}
