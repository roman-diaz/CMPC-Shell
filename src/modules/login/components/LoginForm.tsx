import { assets } from '../../../constants/images.tsx';

import LoginFieldsForm from './LoginFieldsForm.tsx';

export default function LoginForm() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[52vh] min-h-[360px] overflow-hidden">
        <img
          src={assets.imgBg}
          alt=""
          className="h-full w-full object-cover object-bottom select-none"
          draggable={false}
        />
      </div>

      {/* 👇 acá: que el contenedor se adapte y el card crezca por contenido */}
      <div className="relative z-10 flex justify-center items-start p-8">
        <div className="w-full max-w-[480px] rounded-2xl border border-gray-200 bg-white p-16 shadow-lg flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <img
              src={assets.LogoFiberplace}
              alt="FiberPlace"
              className="h-[4rem] w-auto object-contain"
            />
          </div>

          <h1 className="text-3xl text-center font-extrabold text-green-700">Iniciar sesión</h1>
          <img src={assets.cmpc} alt="CMPC" className="h-7 self-start" />
          <LoginFieldsForm />

          <div className="flex items-center gap-1 text-sm text-gray-500 py-2">
            <span>Powered by</span>
            <img src={assets.cmpc} alt="CMPC" className="h-[1.5em] w-auto inline-block pb-1" />
          </div>

          <div className="flex justify-center pt-2">
            <img src={assets.footerCmpc} alt="CMPC Supply" className="h-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
