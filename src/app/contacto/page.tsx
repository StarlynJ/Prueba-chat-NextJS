'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(
      'service_gb7ljel',
      'template_vgvxdzi',
      {
        name: `${form.nombre} ${form.apellido}`,
        email: form.email,
        telefono: form.telefono,
        message: form.mensaje,
      },
      'WcE6KRZoKbnsH00v9'
    ).then(() => {
      alert('Correo enviado correctamente');
      setForm({ nombre: '', apellido: '', email: '', telefono: '', mensaje: '' });
    }).catch((error) => {
      console.error('Error al enviar el correo:', error);
      alert('Hubo un error al enviar el correo');
    });
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-3xl font-bold">Contáctanos</h1>
        <p className="mt-2">Estamos aquí para responder tus preguntas sobre UNAPEC.</p>
      </section>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto my-10 p-6 bg-white shadow rounded">
        <div className="flex gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Número de teléfono"
          value={form.telefono}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="mensaje"
          placeholder="Comentario (máximo 1000 palabras)"
          value={form.mensaje}
          onChange={handleChange}
          maxLength={1000}
          required
          className="w-full p-2 border rounded h-40"
        ></textarea>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Enviar
        </button>
      </form>
      <Footer />
    </main>
  );
}


