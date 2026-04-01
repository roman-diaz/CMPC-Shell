import ErrorCard from '@/components/error-card/ErrorCard.tsx';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="justify-center w-11/12">
        <ErrorCard message={'Ruta no encontrada.'} />
      </div>
    </div>
  );
}

export default NotFound;
