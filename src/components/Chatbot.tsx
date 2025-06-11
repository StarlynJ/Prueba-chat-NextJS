'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

type Mensaje = {
  sender: 'bot' | 'user';
  text: string;
};

export default function Chatbot() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [inputHabilitado, setInputHabilitado] = useState(false);
  const [input, setInput] = useState('');
  const [pasoContacto, setPasoContacto] = useState<'nombre' | 'telefono' | 'correo' | 'completo' | null>(null);
  const [formData, setFormData] = useState({ nombre: '', telefono: '', correo: '' });
  const [mostrarPrecios, setMostrarPrecios] = useState(false);
  const [mostrarDuraciones, setMostrarDuraciones] = useState(false);
  const [minimizado, setMinimizado] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState(false);

  useEffect(() => {
    const saludo: Mensaje = {
      sender: 'bot',
      text: '👋 ¡Hola! ¿En qué podemos ayudarte?',
    };
    setMensajes([saludo]);
    setNuevoMensaje(true);
  }, []);

  const agregarMensaje = (msg: Mensaje) => {
    setMensajes((prev) => [...prev, msg]);
    if (minimizado && msg.sender === 'bot') setNuevoMensaje(true);
  };

  const estaEnHorarioLaboral = () => {
    const hora = new Date().getHours();
    return hora >= 8 && hora < 17;
  };

  const manejarOpcion = (opcion: string, label: string) => {
    agregarMensaje({ sender: 'user', text: label });

    switch (opcion) {
      case 'inscripcion':
        agregarMensaje({ sender: 'bot', text: '💰 El precio de inscripción es de DOP 2,000.' });
        setMostrarPrecios(false);
        setMostrarDuraciones(false);
        break;
      case 'reinscripcion':
        agregarMensaje({ sender: 'bot', text: '💵 El precio de reinscripción es de DOP 1,000.' });
        setMostrarPrecios(false);
        setMostrarDuraciones(false);
        break;
      case 'carrera-precio':
        agregarMensaje({ sender: 'bot', text: 'Selecciona una carrera para saber el precio:' });
        setMostrarPrecios(true);
        setMostrarDuraciones(false);
        break;
      case 'carrera-duracion':
        agregarMensaje({ sender: 'bot', text: 'Selecciona una carrera para saber la duración:' });
        setMostrarPrecios(false);
        setMostrarDuraciones(true);
        break;
      case 'ubicacion':
        agregarMensaje({ sender: 'bot', text: '📍 Estamos ubicados en AV 28, Honduras, Distrito Nacional.' });
        setMostrarPrecios(false);
        setMostrarDuraciones(false);
        break;
      case 'contacto':
        setPasoContacto('nombre');
        setInputHabilitado(true);
        agregarMensaje({ sender: 'bot', text: 'Por favor, ingresa tu nombre:' });
        setMostrarPrecios(false);
        setMostrarDuraciones(false);
        break;
      default:
        if (opcion.includes('precio-')) {
          const carrera = opcion.split('-')[1];
          const precios: Record<string, string> = {
            industrial: 'DOP 500,000',
            economica: 'DOP 700,000',
            software: 'DOP 400,000',
            medicina: 'DOP 1,000,000',
            derecho: 'DOP 600,000',
          };
          agregarMensaje({ sender: 'bot', text: `El costo aproximado de ${carrera} es ${precios[carrera]}` });
        } else if (opcion.includes('duracion-')) {
          const carrera = opcion.split('-')[1];
          const duraciones: Record<string, string> = {
            industrial: '4 años',
            economica: '4 años',
            software: '4 años y medio',
            medicina: '6 años y medio',
            derecho: '4 años y medio',
          };
          agregarMensaje({ sender: 'bot', text: `La duración aproximada de ${carrera} es ${duraciones[carrera]}` });
        }
    }
  };

  const manejarEnvio = () => {
    if (!input.trim()) return;

    agregarMensaje({ sender: 'user', text: input });

    if (pasoContacto === 'nombre') {
      setFormData({ ...formData, nombre: input });
      setPasoContacto('telefono');
      agregarMensaje({ sender: 'bot', text: 'Gracias. Ahora ingresa tu número telefónico:' });
    } else if (pasoContacto === 'telefono') {
      setFormData({ ...formData, telefono: input });
      setPasoContacto('correo');
      agregarMensaje({ sender: 'bot', text: 'Perfecto. Ahora ingresa tu correo electrónico:' });
    } else if (pasoContacto === 'correo') {
      const completo = { ...formData, correo: input };
      setFormData(completo);
      setPasoContacto('completo');
      setInputHabilitado(false);

      const enHorario = estaEnHorarioLaboral();
      const respuesta = enHorario
        ? `Gracias ${completo.nombre}, le estaremos contactando a su número: ${completo.telefono}.`
        : `Gracias ${completo.nombre}, le estaremos enviando la información a su correo ${completo.correo} o lo llamaremos a su número: ${completo.telefono}, cuando estemos en horario laboral.`;

      agregarMensaje({ sender: 'bot', text: respuesta });
    }

    setInput('');
  };

  if (minimizado) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => {
            setMinimizado(false);
            setNuevoMensaje(false);
          }}
          className="relative bg-blue-600 text-white rounded-full p-3 shadow-lg cursor-pointer hover:scale-110 hover:bg-blue-700 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          {nuevoMensaje && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-1.5 text-xs">
              1
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-[300px] shadow-lg rounded-lg bg-white border border-gray-300 z-50 flex flex-col text-sm">
      <div
        className="bg-blue-600 text-white p-2 rounded-t-lg font-bold text-center cursor-pointer"
        onClick={() => setMinimizado(true)}
      >
        🎓 Chat UNAPEC 
      </div>

      <div className="p-3 border-b border-gray-200 space-y-2 bg-gray-50">
        <div className="grid grid-cols-1 gap-2">
          <button onClick={() => manejarOpcion('inscripcion', 'Precio de inscripción')} className="bg-gray-200 px-3 py-2 rounded text-left">Precio de inscripción</button>
          <button onClick={() => manejarOpcion('reinscripcion', 'Precio de reinscripción')} className="bg-gray-200 px-3 py-2 rounded text-left">Precio de reinscripción</button>
          <button onClick={() => manejarOpcion('carrera-precio', '¿Cuánto vale una carrera?')} className="bg-gray-200 px-3 py-2 rounded text-left">¿Cuánto vale una carrera?</button>
          <button onClick={() => manejarOpcion('carrera-duracion', '¿Cuánto dura una carrera?')} className="bg-gray-200 px-3 py-2 rounded text-left">¿Cuánto dura una carrera?</button>
          <button onClick={() => manejarOpcion('ubicacion', '¿Dónde estamos ubicados?')} className="bg-gray-200 px-3 py-2 rounded text-left">¿Dónde estamos ubicados?</button>
          <button onClick={() => manejarOpcion('contacto', 'Quiero contactarme con ustedes')} className="bg-gray-200 px-3 py-2 rounded text-left">Quiero contactarme con ustedes</button>
        </div>

        {(mostrarPrecios || mostrarDuraciones) && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            {['industrial', 'economica', 'software', 'medicina', 'derecho'].map((c) => (
              <button
                key={c}
                onClick={() =>
                  manejarOpcion(
                    mostrarPrecios ? `precio-${c}` : `duracion-${c}`,
                    c.charAt(0).toUpperCase() + c.slice(1)
                  )
                }
                className="bg-blue-50 px-2 py-1 rounded"
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-52 overflow-y-auto p-3 space-y-2">
        {mensajes.map((msg, idx) => (
          <div key={idx} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
            <span className={msg.sender === 'user' ? 'bg-blue-100 px-2 py-1 rounded' : 'bg-gray-100 px-2 py-1 rounded'}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && manejarEnvio()}
          disabled={!inputHabilitado}
          placeholder={inputHabilitado ? 'Escribe tu respuesta aquí...' : 'Selecciona una opción'}
          className="flex-1 border px-2 py-1 rounded text-xs"
        />
        <button
          onClick={manejarEnvio}
          disabled={!inputHabilitado}
          className="bg-blue-600 text-white px-3 py-1 rounded disabled:bg-gray-400 text-xs"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

